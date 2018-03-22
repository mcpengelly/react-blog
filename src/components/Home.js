import React, { Component } from 'react'
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
    // request blog posts from server
    fetch('/api/posts')
      .then(response => {
        return response.json()
      })
      .then(text => {
        console.log(text)

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
