import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

const styles = {
  container: {
    padding: 25
  }
}

const SOFlair = () => {
  return (
    <a href='http://stackoverflow.com/users/7664140/matt-pengelly'>
      <img
        src='http://stackoverflow.com/users/flair/7664140.png'
        width='256'
        height='74'
        alt='profile for Matt Pengelly at Stack Overflow'
        title='profile for Matt Pengelly at Stack Overflow'
      />
    </a>
  )
}

class ContactInfo extends Component {
  render () {
    return (
      <div className={this.props.classes.container}>
        <Typography variant='title'>Contact Information: </Typography>
        <address>
          Github: mcpengelly<br />
          <a href='mailto:pengelly.mat@gmail.com'>pengelly.mat@gmail.com</a>
          <br />
          Ontario, Canada<br />
        </address>
        <SOFlair />
      </div>
    )
  }
}

export default withStyles(styles)(ContactInfo)
