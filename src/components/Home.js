import React, { Component } from 'react'
import 'whatwg-fetch' // fetch

import BlogContainer from './utility/BlogContainer'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      blogPosts: []
    }
  }

  componentDidMount () {
    // request blog posts from server
    fetch('/api/posts')
      .then(response => {
        return response.json()
      })
      .then(text => {
        // set state to list received from backend
        this.setState({
          blogPosts: text
        })
      })
      .catch(error => {
        throw error
      })
  }

  render () {
    return <BlogContainer posts={this.state.blogPosts} />
  }
}
