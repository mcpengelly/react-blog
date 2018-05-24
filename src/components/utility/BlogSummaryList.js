import React, { Component } from 'react'

import FloatingButton from './FloatingButton'
import BlogSummary from './BlogSummary'

class BlogSummaryList extends Component {
  render () {
    const blogPosts = this.props.posts.map((post, index) => {
      return (
        <BlogSummary
          key={index}
          id={post.id}
          title={post.title}
          content={post.content}
          catchPhrase={post.catchPhrase}
          lastUpdatedDate={post.lastUpdatedDate}
          img={post.img}
        />
      )
    })

    return (
      <div>
        <FloatingButton
          url='/blog/new/post'
          color='primary'
          iconName='note_add'
        />
        {blogPosts}
      </div>
    )
  }
}

export default BlogSummaryList
