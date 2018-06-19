import React from 'react'
import { Link } from 'react-router-dom'
import Icon from 'material-ui/Icon'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

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
    <Button
      onClick={onClick}
      className={classes.floatButton}
      component={Link}
      to={url}
      color={color}
      style={{ transform: translation }}
      aria-label='new'
      variant='fab'
    >
      <Icon>{iconName}</Icon>
    </Button>
  )
}

export default withStyles(styles)(FloatingButton)
