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
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'

import { _abbreviate } from '../../helpers/helpers'

const styles = theme => ({
  card: {
    maxWidth: 300,
    minWidth: 300
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

class PortfolioItem extends Component {
  constructor () {
    super()
    this.state = { expanded: false }
    this.handleExpandClick = this.handleExpandClick.bind(this)
  }
  onDeleteClick () {
    console.log('does nothing')
  }

  handleExpandClick () {
    this.setState({ expanded: !this.state.expanded })
  }

  render () {
    const { classes, img } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label='abbrv' className={classes.avatar}>
              {_abbreviate(this.props.title)}
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
          image={`http://localhost:4000/${img}`}
          title={img}
        />
        <CardContent>
          <Typography variant='body1'>{this.props.description}</Typography>
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
            <ExpandMoreIcon />
          </IconButton>
          <Button
            size='small'
            component={Link}
            to={`/portfolio/${this.props.id}`}
          >
            View
          </Button>
        </CardActions>
        <Collapse in={this.props.expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph variant='body2'>
              Method:
            </Typography>
            <Typography paragraph>{this.state.description}</Typography>
            <Typography paragraph>{this.state.description}</Typography>
          </CardContent>
          <CardActions>
            <Button
              mini
              component={Link}
              to={'/edit'}
              aria-label='new'
              variant='fab'
            >
              <Icon>edit_pencil</Icon>
            </Button>
            <Button
              mini
              onClick={this.onDeleteClick.bind(this)}
              aria-label='delete'
              variant='fab'
            >
              <Icon>delete</Icon>
            </Button>
          </CardActions>
        </Collapse>
      </Card>
    )
  }
}

PortfolioItem.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PortfolioItem)
