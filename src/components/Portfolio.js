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
    const lorem =
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'

    // fetch portfolio items
    fetch('/api/projects')
      .then(response => {
        return response.json()
      })
      .then(text => {
        console.log(text)
        // set state to list received from backend
        // text = [
        //   { index: '1', description: lorem, title: 'Project Number One' },
        //   { index: '2', description: lorem, title: 'Project Number Two' },
        //   { index: '3', description: lorem, title: 'Project Number Three' },
        //   { index: '4', description: lorem, title: 'Project Number Four' },
        //   { index: '5', description: lorem, title: 'Project Number Five' },
        //   { index: '6', description: lorem, title: 'Project Number Six' },
        //   { index: '7', description: lorem, title: 'Project Number Seven' }
        // ] // for testing only
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
