import React, { Component } from 'react'
import BlogSummary from './BlogSummary'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import BlogPost from './BlogPost'

class BlogContainer extends Component {
  render () {
    const blogPosts = this.props.posts.map((post, index) => {
      return (
        <div key={index}>
          <BlogSummary id={post.id} title={post.title} content={post.content} />
          <Route path={`/${post.id}`} component={BlogPost} />
        </div>
      )
    })

    return <div>{blogPosts}</div>
  }
}

export default BlogContainer
