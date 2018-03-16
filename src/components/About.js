import React, { Component } from 'react'

import ContactForm from './utility/ContactForm'
import ContactInfo from './utility/ContactInfo'

import Grid from 'material-ui/Grid'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'

const styles = {
  root: {
    top: 0,
    minWidth: 275,
    maxWidth: 875,
  },
  paper: {
    maxWidth: 875,
    margin: 'auto'
  }
}

class About extends Component {
  render () {
    const { classes } = this.props
    return (
      <Grid container>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ContactForm />
              <Divider/>
              <ContactInfo />
            </Paper>
          </Grid>
      </Grid>
    )
  }
}
export default withStyles(styles)(About)
