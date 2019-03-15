import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import ContactForm from './utility/ContactForm'
import ContactInfo from './utility/ContactInfo'

const styles = {
  container: {
    paddingTop: 25,
    maxWidth: 900,
    margin: 'auto'
  }
}

class About extends Component {
  render () {
    const { classes } = this.props
    return (
      <Paper className={classes.container}>
        <Typography variant='h4' gutterBottom>
          More info coming soon.
        </Typography>
        <ContactForm />
        <Divider />
        <ContactInfo />
      </Paper>
    )
  }
}
export default withStyles(styles)(About)
