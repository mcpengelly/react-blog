import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import { CircularProgress } from 'material-ui/Progress'
import uuidv4 from 'uuidv4'

import EditableProject from './utility/EditableProject'
import ProjectsList from './utility/ProjectsList'

function withProjectData (WrappedComponent, callback) {
  return class ProjectContainer extends React.Component {
    constructor () {
      super()
      this.state = {
        title: '',
        description: '',
        pageIsReady: false
      }
    }

    componentDidMount () {
      fetch(`/api/projects/${this.props.match.params.id}`)
        .then(res => {
          return res.json()
        })
        .then(blogPost => {
          this.setState({
            title: blogPost.title,
            description: blogPost.description,
            img: blogPost.img,
            pageIsReady: true
          })
        })
    }

    render () {
      if (!this.state.pageIsReady) {
        return <CircularProgress />
      }

      return (
        <WrappedComponent
          id={this.props.match.params.id}
          title={this.state.title}
          description={this.state.description}
          img={this.state.img}
          addProject={callback}
        />
      )
    }
  }
}

export default class Portfolio extends Component {
  constructor (props) {
    super(props)
    this.state = {
      projectList: []
    }

    this.addProject = this.addProject.bind(this)
    this.removeProject = this.removeProject.bind(this)
  }

  componentDidMount () {
    fetch('/api/projects')
      .then(response => {
        return response.json()
      })
      .then(text => {
        console.log(text)

        this.setState({
          projectList: text
        })
      })
      .catch(error => {
        throw error
      })
  }

  removeProject (projectId) {
    const options = { method: 'delete' }

    fetch(`/api/projects/${projectId}`, options).then(() => {
      this.setState({
        projectList: this.state.projectList.filter(
          project => project.id !== projectId
        )
      })
    })
  }

  addProject (project) {
    const { id, isNew, title, description, file } = project

    let data = {
      id: !isNew ? id : uuidv4(),
      title: title,
      description: description,
      file: file[0] // should do this better
    }

    // for sending multipart/form-data
    let formData = new FormData()
    for (let name in data) {
      formData.append(name, data[name])
    }

    const url = isNew ? '/api/projects' : `/api/projects/${id}`

    const options = {
      method: isNew ? 'POST' : 'PUT',
      body: formData
    }

    fetch(url, options)
      .then(response => {
        return response.text()
      })
      .then(() => {
        if (isNew) {
          this.setState({
            projectList: this.state.projectList.concat({
              ...data,
              img: file[0].name
            })
          })
        } else {
          this.setState({
            projectList: this.state.projectList.map(p => {
              // when we find a match replace its data
              if (project.id === p.id) {
                return { ...project, img: file[0].name }
              }
              return p
            })
          })
        }
      })
  }

  render () {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          render={() => {
            return (
              <ProjectsList
                removeProject={this.removeProject}
                projects={this.state.projectList}
              />
            )
          }}
        />
        <Route
          exact
          path={`${this.props.match.url}/:id/edit`}
          component={withProjectData(EditableProject, this.addProject)}
        />
        <Route
          exact
          path={`${this.props.match.url}/new/project`}
          render={() => {
            return <EditableProject isNew addProject={this.addProject} />
          }}
        />
      </Switch>
    )
  }
}
