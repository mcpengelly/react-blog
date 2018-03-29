import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import classnames from 'classnames'
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import red from 'material-ui/colors/red'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import Button from 'material-ui/Button'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 194
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
})

class SingleProject extends Component {
  constructor () {
    super()
    this.state = { expanded: false, id: '', title: '', description: '' }
    this.handleExpandClick = this.handleExpandClick.bind(this)
  }

  handleExpandClick () {
    this.setState({ expanded: !this.state.expanded })
  }

  componentDidMount () {
    fetch(`/api/projects/${this.props.id}`)
      .then(res => {
        return res.json()
      })
      .then(blogPost => {
        console.log('blogPost', blogPost)

        this.setState({
          title: blogPost.title,
          content: blogPost.content
        })
      })
  }

  render () {
    const { classes } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label='Recipe' className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.state.title}
          subheader={''}
        />
        <CardMedia
          className={classes.media}
          image='/static/images/cards/paella.jpg'
          title='bing'
        />
        <CardContent>
          <Typography variant='body1'>{this.state.description}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label='Show more'
          >
            <Button
              size='small'
              component={Link}
              to={`/projects/${this.props.id}/edit`}
            >
              Edit
            </Button>
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph variant='body2'>
              Method:
            </Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

SingleProject.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SingleProject)