import React, { Component } from 'react'
import BlogSummary from './BlogSummary'

class BlogContainer extends Component {
  render () {
    const blogPosts = this.props.posts.map((post, index) => {
      return (
        <BlogSummary
          key={index}
          id={post.id}
          title={post.title}
          content={post.content}
        />
      )
    })

    return <div>{blogPosts}</div>
  }
}

export default BlogContainer
