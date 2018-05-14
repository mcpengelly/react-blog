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
import FloatingButton from './FloatingButton'

const styles = theme => ({
  card: {
    margin: 'auto',
    maxWidth: 400,
    minWidth: 400
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

  onDeleteClick () {
    const options = { method: 'DELETE' }

    fetch(`/api/projects/${this.props.id}`, options)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        throw err
      })
  }

  componentDidMount () {
    // fetch(`/api/projects/${this.props.id}`)
    //   .then(res => {
    //     return res.json()
    //   })
    //   .then(blogPost => {
    //     console.log('blogPost', blogPost)

    //     this.setState({
    //       title: blogPost.title,
    //       content: blogPost.content
    //     })
    //   })
    console.log('this.props', this.props)
  }

  render () {
    const { classes } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label='Recipe' className={classes.avatar}>
              MP
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.title}
          subheader={''}
        />
        <CardMedia
          className={classes.media}
          image='/static/images/cards/paella.jpg'
          title='bing'
        />
        <CardContent>
          <Typography variant='body1'>{this.props.description}</Typography>
        </CardContent>
      </Card>
    )
  }
}

SingleProject.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SingleProject)
