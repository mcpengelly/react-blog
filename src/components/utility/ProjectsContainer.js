import React, { Component } from 'react'

import Project from './Project'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'

const imgPath = '/uploads/'

const styles = theme => ({
  dev: {
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

class ProjectsContainer extends Component {
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
      <div className={classes.dev}>
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

export default withStyles(styles)(ProjectsContainer)
