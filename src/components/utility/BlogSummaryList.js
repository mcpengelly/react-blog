import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'

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
