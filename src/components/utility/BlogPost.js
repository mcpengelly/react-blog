import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 825,
    margin: 'auto'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  media: {
    height: 200
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary
  }
})

function BlogSummary (props) {
  const { classes } = props
  const bull = <span className={classes.bullet}>•</span>

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image='/static/images/cards/contemplative-reptile.jpg'
        title='bang'
      />
      <CardContent>
        <Typography className={classes.title}>Word of the Day</Typography>
        <Typography variant='headline' component='h2'>
          {props.title}
        </Typography>
        <Typography className={classes.pos}>adjective</Typography>
        <Typography component='p'>
          {props.content}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>See More...</Button>
      </CardActions>
    </Card>
  )
}

BlogSummary.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BlogSummary)
