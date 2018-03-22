import React, { Component } from 'react'
import 'whatwg-fetch' // fetch
import { BrowserRouter as Router, Route } from 'react-router-dom'
import BlogContainer from './utility/BlogContainer'
import BlogPost from './utility/BlogPost'

// enable this versus in child component, container styles should be top level.
// const styles = {
//   card: {
//     minWidth: 275,
//     maxWidth: 875,
//     margin: 'auto'
//   }
// }

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      blogPosts: []
    }
  }

  componentDidMount () {
    const lorem = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec aliquet semper dui. Ut pretium felis accumsan ante tempor,
      id aliquet est pretium. Etiam facilisis odio vitae semper molestie.
      Phasellus vestibulum pretium cursus. Ut maximus feugiat commodo.
      Donec sed lobortis felis. Nullam eros dolor, luctus ut sem sit amet,
      commodo pellentesque libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    `
    // request blog posts from server
    fetch('/api/posts')
      .then(response => {
        return response.json()
      })
      .then(text => {
        // set state to list received from backend
        // text = [
        //   { index: '1', content: lorem, title: 'Title Number One' },
        //   { index: '2', content: lorem, title: 'Title Number Two' }
        // ] // for testing only
        this.setState({
          blogPosts: text
        })
      })
      .catch(error => {
        throw error
      })
  }

  render () {
    return (
      <div>
        <Route path={`${this.props.match.url}:id`} component={BlogPost} />
        <BlogContainer posts={this.state.blogPosts} />
      </div>
    )
  }
}
