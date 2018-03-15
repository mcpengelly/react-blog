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
    const lorem = `
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
    `

    // fetch portfolio items
    fetch('/api/projects')
      // .then(response => {
      //   return response.json()
      // })
      .then(text => {
        // set state to list received from backend
        text = [
          { index: '1', description: lorem, title: 'Project Number One' },
          { index: '2', description: lorem, title: 'Project Number Two' }
        ] // for testing only
        this.setState({
          projectList: text
        })
      })
      .catch(error => {
        throw new Error(error)
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
