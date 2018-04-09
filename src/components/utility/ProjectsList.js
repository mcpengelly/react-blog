import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'

import Project from './Project'
import FloatingButton from './FloatingButton'

const imgPath = '/uploads/'

const styles = theme => ({
  container: {
    padding: 25,
    maxWidth: 875,
    minWidth: 250,
    margin: 'auto'
  },
  root: {
    flexGrow: 1
  },
  paper: {
    maxWidth: 350
  },
  control: {
    padding: theme.spacing.unit
  }
})

class ProjectsList extends Component {
  constructor () {
    super()
    this.state = {
      spacing: '16'
    }
  }
  render () {
    const { classes } = this.props
    const { spacing } = this.state
    const projects = this.props.projects.map((project, index) => {
      return (
        <Grid key={index} item>
          <Paper className={classes.paper}>
            <Project
              key={index}
              title={project.title}
              img={imgPath + project.img}
              description={project.description}
            />
          </Paper>
        </Grid>
      )
    })

    return (
      <div className={classes.container}>
        <FloatingButton url='/portfolio/new/project' />
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid
              container
              className={classes.demo}
              justify='center'
              spacing={Number(spacing)}
            >
              {projects}
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(ProjectsList)
