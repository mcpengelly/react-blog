import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import { baseURL } from '../../helpers/globals'

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 875,
    margin: 'auto',
    padding: 10
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
  const { classes, title, content, catchPhrase, id, img } = props

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={baseURL + img}
        title={title}
      />
      <CardContent>
        <Typography variant='headline'>{title}</Typography>
        <Typography className={classes.pos}>
          {catchPhrase || 'catchyPhrase'}
        </Typography>
        <Typography variant='body1'>{content}</Typography>
        <br />
      </CardContent>
      <CardActions>
        <Button size='small' component={Link} to={`/blog/${id}`}>
          See More...
        </Button>
      </CardActions>
    </Card>
  )
}

BlogSummary.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BlogSummary)
