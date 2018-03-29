import React, { Component } from 'react'
import BlogSummary from './BlogSummary'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'

const styles = {
  floatButton: {
    postiion: 'sticky',
    top: '10%'
  }
}
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

    const { classes } = this.props

    return (
      <div>
        <Button
          className={classes.floatButton}
          component={Link}
          to='/blog/new/post'
          variant='fab'
          color='primary'
          aria-label='edit'
        >
          <Icon>edit_icon</Icon>
        </Button>
        {blogPosts}
      </div>
    )
  }
}

export default withStyles(styles)(BlogContainer)
