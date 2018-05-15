import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import { BrowserRouter as Router } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import { Redirect } from 'react-router'
import uuidv4 from 'uuidv4'

import classnames from 'classnames'
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import red from 'material-ui/colors/red'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import MoreVertIcon from 'material-ui-icons/MoreVert'

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
    backgroundColor: red[500]
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
      title: '',
      description: '',
      isNew: isNew || false,
      file: [{ preview: '/placeholder' }],
      redirect: false
    }
  }

  onHandleChange (name) {
    return e => {
      this.setState({
        [name]: e.target.value
      })
    }
  }

  componentDidMount (props) {
    const { isNew, id, title, description, img } = this.props

    // if its not a new record then fetch existing data from backend
    if (!isNew) {
      this.setState({
        id,
        title,
        description,
        img
      })
    }
  }

  onSubmitClick (e) {
    e.preventDefault()

    // bubble state upward
    this.props.addProject(this.state)

    // clear inputs, redirect
    this.setState({
      id: '',
      title: '',
      description: '',
      file: [{ preview: '/placeholder' }],
      redirect: true
    })
  }

  onDrop (acceptedFiles, rejectedFiles) {
    this.setState({
      file: acceptedFiles
    })
  }

  render () {
    const { classes, img } = this.props

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
              onClick={this.onSubmitClick.bind(this)}
              variant='raised'
              color='primary'
            >
              Submit
            </Button>
          </form>
        </CardActions>
        <Divider />

        <Typography variant='headline'>Preview</Typography>

        {/* <SingleProject title={this.state.title} description={this.state.description} /> */}
        <Card className={classes.innerCard}>
          <CardHeader
            avatar={
              <Avatar aria-label='Recipe' className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={this.state.title}
            subheader={''}
          />
          <CardMedia
            className={classes.media}
            image={
              this.state.isNew
                ? this.state.file[0].preview
                : `http://localhost:4000/${img}`
            }
            title={img}
          />
          <CardContent>
            <Typography variant='body1'>{this.state.description}</Typography>
          </CardContent>
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
