import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { withStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Collapse from '@material-ui/core/Collapse'
import yellow from '@material-ui/core/colors/yellow'
import classnames from 'classnames'
import moment from 'moment'

import { baseURL } from '../../helpers/globals'

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
    backgroundColor: yellow[600]
  }
})

class PortfolioItem extends Component {
  constructor () {
    super()
    this.state = { expanded: false, anchorEl: null }

    this.handleExpandClick = this.handleExpandClick.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.handleMenuClose = this.handleMenuClose.bind(this)
  }

  onDeleteClick (id) {
    return () => {
      this.props.removeProject(id)
      this.handleMenuClose()
    }
  }

  handleExpandClick () {
    this.setState({ expanded: !this.state.expanded })
  }

  handleMenuClick (event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClose () {
    this.setState({ anchorEl: null })
  }

  render () {
    const { classes, id, title, img, description, lastUpdatedDate } = this.props
    const { anchorEl, expanded } = this.state

    const imgPath = baseURL + img

    return (
      <Card className={classes.card}>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleMenuClose}
        >
          <MenuItem component={Link} to={`/portfolio/${id}/edit`}>
            <Icon>edit_pencil</Icon>Edit
          </MenuItem>
          <MenuItem onClick={this.onDeleteClick(id)}>
            <Icon>delete</Icon>Delete
          </MenuItem>
        </Menu>
        <CardHeader
          avatar={
            <Avatar aria-label='language' className={classes.avatar}>
              JS
            </Avatar>
          }
          action={
            <IconButton
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup='true'
              onClick={this.handleMenuClick}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={moment(lastUpdatedDate).format('YYYY-MM-DD')}
        />
        <CardMedia className={classes.media} image={imgPath} title={img} />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label='Show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>{description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

PortfolioItem.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PortfolioItem)
