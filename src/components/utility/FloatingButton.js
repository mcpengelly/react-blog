import React, { Component } from 'react'
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
  const { classes } = props

  return (
    <Button
      onClick={props.onClick}
      className={classes.floatButton}
      component={Link}
      to={props.url}
      color={props.color}
      style={{ transform: props.translation }}
      aria-label='new'
      variant='fab'
    >
      <Icon>{props.iconName}</Icon>
    </Button>
  )
}

export default withStyles(styles)(FloatingButton)
