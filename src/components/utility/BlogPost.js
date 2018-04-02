import React, { Component } from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Card, { CardContent, CardMedia, CardActions } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

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
    const { classes, title, content, catchPhrase, img } = this.props
    console.log('image', img)

    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={`${img}`} title='bang' />
        <CardContent>
          <Typography className={classes.title}>{title || 'title'}</Typography>
          <Typography variant='headline'>{title || 'title'}</Typography>
          <Typography className={classes.pos}>
            {catchPhrase || 'catchPhrase'}
          </Typography>
          <Typography variant='body1'>{content || 'content'}</Typography>
        </CardContent>
        <CardActions>
          <Button size='small' component={Link} to={`${this.props.id}/edit`}>
            Edit
          </Button>
        </CardActions>
      </Card>
    )
  }
}
// style={{ backgroundImage: 'url(' + backgroundImage + ')' }} // probably not

export default withStyles(styles)(BlogPost)
