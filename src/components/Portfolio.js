import React, { Component } from 'react'

import ProjectsContainer from './utility/ProjectsContainer'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import SingleProject from './utility/SingleProject'
import EditableProject from './utility/EditableProject'

export default class Portfolio extends Component {
  constructor (props) {
    super(props)
    this.state = {
      projectList: []
    }
  }

  componentDidMount () {
    // fetch portfolio items
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
    return (
      <Switch>
        <ProjectsContainer projects={this.state.projectList} />
        <Route
          exact
          path={`${this.props.match.url}/:id`}
          component={SingleProject}
        />
        <Route
          exact
          path={`${this.props.match.url}/:id/edit`}
          component={EditableProject}
        />
      </Switch>
    )
  }
}
