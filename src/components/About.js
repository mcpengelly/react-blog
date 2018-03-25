import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'

import ContactForm from './utility/ContactForm'
import ContactInfo from './utility/ContactInfo'

const styles = {
  container: {
    paddingTop: 25,
    maxWidth: 875,
    margin: 'auto'
  }
}

class About extends Component {
  render () {
    const { classes } = this.props
    return (
      <Paper className={classes.container}>
        <Typography variant='title'>More info coming soon!</Typography>
        <ContactForm />
        <Divider />
        <ContactInfo />
      </Paper>
    )
  }
}
export default withStyles(styles)(About)
