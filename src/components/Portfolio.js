import React, { Component } from 'react'

import ProjectsList from './utility/ProjectsList'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import SingleProject from './utility/SingleProject'
import EditableProject from './utility/EditableProject'
import { CircularProgress } from 'material-ui/Progress'

function withProjectData (WrappedComponent) {
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

  render () {
    console.log('this.props.match.url', this.props.match.url)
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          render={() => {
            return <ProjectsList projects={this.state.projectList} />
          }}
        />
        <Route
          exact
          path={`${this.props.match.url}/:id`}
          component={withProjectData(SingleProject)}
        />
        <Route
          exact
          path={`${this.props.match.url}/:id/edit`}
          component={withProjectData(EditableProject)}
        />
        <Route
          exact
          path={`${this.props.match.url}/new/project`}
          render={() => {
            return <EditableProject isNew />
          }}
        />
      </Switch>
    )
  }
}
