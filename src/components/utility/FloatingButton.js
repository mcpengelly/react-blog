import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  floatButton: {
    right: '2%',
    bottom: '5%',
    position: 'fixed'
  }
}

function FloatingButton (props) {
  const { classes, onClick, url, color, translation, iconName } = props

  return (
    <Fab
      onClick={onClick}
      className={classes.floatButton}
      component={Link}
      to={url}
      color={color}
      style={{ transform: translation }}
      aria-label='new'
    >
      <Icon>{iconName}</Icon>
    </Fab>
  )
}

export default withStyles(styles)(FloatingButton)
