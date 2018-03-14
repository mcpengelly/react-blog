import React, { Component } from 'react'

import ProjectsContainer from './utility/ProjectsContainer'

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
        // set state to list received from backend
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
      <div>
        <h1>Projects</h1>
        <ProjectsContainer projects={this.state.projectList} />
      </div>
    )
  }
}
