import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Icon from '@material-ui/core/Icon'
import FaGithub from 'react-icons/lib/fa/github'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

class MenuAppBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: false,
      anchorEl: null,
      anchorNavEl: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleMenu = this.handleMenu.bind(this)
    this.handleNavMenu = this.handleNavMenu.bind(this)
    this.handleNavClose = this.handleNavClose.bind(this)
  }

  componentDidMount () {
    if (document.cookie) {
      this.setState({
        auth: true
      })
    } else {
      this.setState({
        auth: false
      })
    }
  }

  handleChange (event, checked) {
    this.setState({ auth: checked })
  }

  handleMenu (event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose () {
    this.setState({ anchorEl: null })
  }

  handleNavMenu (event) {
    this.setState({ anchorNavEl: event.currentTarget })
  }

  handleNavClose () {
    this.setState({ anchorNavEl: null })
  }

  navigateLogin () {
    window.location.href = '/login'
  }

  render () {
    const { classes } = this.props
    const { auth, anchorEl, anchorNavEl } = this.state
    const openProfile = Boolean(anchorEl)
    const openNavigation = Boolean(anchorNavEl)

    return (
      <div className={classes.root}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={auth}
                onChange={this.handleChange}
                aria-label='LoginSwitch'
              />
            }
            label={auth ? 'Logout' : 'Login'}
            onClick={this.navigateLogin}
          />
        </FormGroup>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color='inherit'
              aria-label='Menu'
              onClick={this.handleNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <a href='https://github.com/mcpengelly'>
              <FaGithub size={28} />
            </a>
            <Menu
              id='menu-appbar'
              anchorEl={anchorNavEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={openNavigation}
              onClose={this.handleNavClose}
            >
              <MenuItem
                component={Link}
                onClick={this.handleNavClose}
                to='/blog'
              >
                <Icon>home</Icon> - Home
              </MenuItem>
              <MenuItem
                component={Link}
                onClick={this.handleNavClose}
                to='/about'
              >
                <Icon>info</Icon> - About
              </MenuItem>
              <MenuItem
                component={Link}
                onClick={this.handleNavClose}
                to='/portfolio'
              >
                <Icon>folder</Icon> - Projects
              </MenuItem>
            </Menu>
            <Typography
              variant='title'
              color='inherit'
              className={classes.flex}
            >
              {this.state.pageTitle}
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={openProfile ? 'menu-appbar' : null}
                  aria-haspopup='true'
                  onClick={this.handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={openProfile}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MenuAppBar)
