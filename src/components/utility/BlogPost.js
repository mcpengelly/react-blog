import React, { Component } from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Card, { CardContent, CardMedia, CardActions } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import FloatingButton from './FloatingButton'

// how should i properly host images? /public?
// where do i dynamically save files from the backend?

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 875,
    margin: 'auto',
    padding: 10
  },
  media: {
    height: 200
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary
  }
})

class BlogPost extends Component {
  render () {
    const {
      classes,
      title,
      content,
      catchPhrase,
      img,
      previewImage
    } = this.props

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={img ? `http://localhost:4000/${img}` : previewImage}
          title={img}
        />
        <CardContent>
          <Typography className={classes.title} variant='headline'>
            {title || 'title'}
          </Typography>
          <Typography className={classes.pos}>
            {catchPhrase || 'catchPhrase'}
          </Typography>
          <Typography variant='body1'>{content || 'content'}</Typography>
        </CardContent>
        <CardActions>
          <Button size='small' component={Link} to={`${this.props.id}/edit`}>
            Edit
          </Button>
          <FloatingButton
            url={`${this.props.id}/edit`}
            color='primary'
            iconName='edit_icon'
            translation='translateX(-120%)'
          />
          <FloatingButton
            url='/blog'
            color='secondary'
            iconName='delete_icon'
            onClick={this.onDeleteClick.bind(this)}
          />
        </CardActions>
      </Card>
    )
  }

  onDeleteClick () {
    const options = { method: 'DELETE' }

    fetch(`/api/posts/${this.props.id}`, options)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        throw err
      })
  }
}

export default withStyles(styles)(BlogPost)
