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
    return <ProjectsContainer projects={this.state.projectList} />
  }
}
