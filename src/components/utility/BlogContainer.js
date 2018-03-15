import React, { Component } from 'react'
import BlogPost from './BlogPost'

export default class BlogContainer extends Component {
  render () {
    const blogPosts = this.props.posts.map((post, index) => {
      return (
        <BlogPost
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
