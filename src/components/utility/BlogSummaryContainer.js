import React, { Component } from 'react'
import BlogSummary from './BlogSummary'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'

const styles = {
  floatButton: {
    margin: 0,
    top: 'auto',
    right: '2%',
    bottom: '10%',
    left: 'auto',
    position: 'fixed'
  }
}
class BlogSummaryContainer extends Component {
  render () {
    const { classes } = this.props

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

export default withStyles(styles)(BlogSummaryContainer)
