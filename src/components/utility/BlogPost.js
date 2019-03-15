import React, { Component } from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'

import FloatingButton from './FloatingButton'

import { baseURL } from '../../helpers/globals'

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
  deletePost (id) {
    return () => {
      this.props.removePost(id)
    }
  }

  render () {
    const {
      classes,
      title,
      content,
      catchPhrase,
      lastUpdatedDate,
      img
    } = this.props

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={baseURL + img}
          title={title}
        />

        <CardContent>
          <Typography className={classes.title} variant='h1' gutterBottom>
            {title || 'title'}
          </Typography>
          <Typography className={classes.pos}>
            {catchPhrase || 'catchPhrase'}
          </Typography>
          <Typography variant='body1'>{content || 'content'}</Typography>
          <Typography variant='body2'>
            {moment(lastUpdatedDate).format('YYYY-MM-DD') || 'lastUpdatedDate'}
          </Typography>
        </CardContent>
        <CardActions>
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
            onClick={this.deletePost(this.props.id)}
          />
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(BlogPost)
