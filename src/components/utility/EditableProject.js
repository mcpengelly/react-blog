import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import yellow from '@material-ui/core/colors/yellow'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import classnames from 'classnames'
import moment from 'moment'

import { baseURL } from '../../helpers/globals'

const styles = theme => ({
  card: {
    maxWidth: 875,
    margin: 'auto',
    paddingBottom: 25
  },
  innerCard: {
    maxWidth: 400,
    maxHeight: '80%',
    marginTop: 25,
    margin: 'auto'
  },
  form: {
    width: '100%',
    margin: 'auto'
  },
  media: {
    height: 200
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: yellow[600]
  },
  textfield: {
    width: '40%'
  },
  textarea: {
    width: '80%'
  },
  fileUploader: {
    marginTop: 25,
    width: '60%',
    height: 100,
    border: '1px solid black',
    margin: 'auto'
  }
})

class EditableProject extends Component {
  constructor (props) {
    super(props)

    const { isNew, id } = props

    this.state = {
      id: id,
      isNew: isNew || false,
      hasPreview: false,
      title: '',
      description: '',
      lastUpdatedDate: moment(new Date()).format('YYYY-MM-DD'),
      img: '',
      file: [{ preview: '/placeholder' }],
      expanded: false,
      redirect: false
    }

    this.onSubmitClick = this.onSubmitClick.bind(this)
    this.handleExpandClick = this.handleExpandClick.bind(this)
  }

  onHandleChange (name) {
    return e => {
      this.setState({
        [name]: e.target.value
      })
    }
  }

  componentDidMount (props) {
    const { isNew, id, title, description, lastUpdatedDate, img } = this.props

    // if its not a new record then fetch existing data from backend
    if (!isNew) {
      this.setState({
        id,
        title,
        description,
        lastUpdatedDate,
        img
      })
    }
  }

  onSubmitClick (e) {
    e.preventDefault()

    // bubble state upward
    this.props.addProject(this.state)

    // redirect
    this.setState({
      redirect: true
    })
  }

  onDrop (acceptedFiles, rejectedFiles) {
    this.setState({
      file: acceptedFiles,
      hasPreview: true
    })
  }

  handleExpandClick () {
    this.setState({ expanded: !this.state.expanded })
  }

  render () {
    const { classes, img } = this.props
    const imgPath = baseURL + img

    if (this.state.redirect) {
      return <Redirect to='/portfolio' />
    }

    return (
      <Card className={classes.card}>
        <CardActions>
          <form className={classes.form}>
            <TextField
              className={classes.textfield}
              label='Project Title'
              value={this.state.title}
              onChange={this.onHandleChange('title')}
            />
            <br />
            <TextField
              className={classes.textarea}
              label='Project Description'
              multiline
              rows='8'
              value={this.state.description}
              onChange={this.onHandleChange('description')}
            />
            <br />
            <Dropzone
              className={classes.fileUploader}
              onDrop={this.onDrop.bind(this)}
            >
              <Typography variant='body2'>
                Drag and Drop to upload a file
              </Typography>
            </Dropzone>
            <br />
            <Button
              onClick={this.onSubmitClick}
              variant='raised'
              color='primary'
            >
              Submit
            </Button>
          </form>
        </CardActions>
        <Divider />

        <Typography variant='headline'>Preview</Typography>

        <Card className={classes.innerCard}>
          <CardHeader
            avatar={
              <Avatar aria-label='Recipe' className={classes.avatar}>
                JS
              </Avatar>
            }
            title={this.state.title}
            subheader={moment(this.state.lastUpdatedDate).format('YYYY-MM-DD')}
          />
          <CardMedia
            className={classes.media}
            image={this.state.hasPreview ? this.state.file[0].preview : imgPath}
            title={img}
          />
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label='Show more'
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
            <CardContent>
              <Typography paragraph>{this.state.description}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Card>
    )
  }
}

export default withStyles(styles)(EditableProject)
