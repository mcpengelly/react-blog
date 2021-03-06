import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Dropzone from 'react-dropzone'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import moment from 'moment'

import { baseURL } from '../../helpers/globals'

// TODO: use/leverage draftjs RTE for adding styles to blog posts with html

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 875,
    margin: 'auto'
  },
  container: {
    marginTop: 25
  },
  media: {
    height: 200,
    margin: 25
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary
  },
  form: {
    width: '100%',
    marginTop: 25,
    marginBottom: 25
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

class EditableBlogPost extends Component {
  constructor (props) {
    super(props)

    const { id, isNew } = props

    this.state = {
      id: id || '',
      isNew: isNew || false,
      title: '',
      content: '',
      catchPhrase: '',
      lastUpdatedDate: moment(new Date()).format('YYYY-MM-DD'),
      hasPreview: false,
      file: [{ preview: '' }],
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

  onSubmitClick (e) {
    e.preventDefault()
    console.log(this.state)
    this.props.addPost(this.state)

    this.setState({
      redirect: true
    })
  }

  onDrop (acceptedFiles) {
    this.setState({
      file: acceptedFiles,
      hasPreview: true
    })
  }

  componentDidMount (props) {
    const {
      isNew,
      id,
      title,
      catchPhrase,
      content,
      lastUpdatedDate,
      img
    } = this.props

    // if its not a new record then fetch existing data from backend
    if (!isNew) {
      this.setState({
        id,
        title,
        catchPhrase,
        lastUpdatedDate,
        content,
        img
      })
    }
  }

  render () {
    const { classes } = this.props
    const {
      redirect,
      title,
      content,
      catchPhrase,
      lastUpdatedDate,
      img,
      file,
      hasPreview
    } = this.state

    const imgPath = baseURL + img

    if (redirect) {
      return <Redirect to='/blog' />
    }

    return (
      <Card className={classes.card}>
        <CardActions>
          <form className={classes.form}>
            <TextField
              className={classes.textfield}
              label='Blog Post Title'
              value={title}
              onChange={this.onHandleChange('title')}
            />
            <br />
            <TextField
              className={classes.textfield}
              label='Catch phrase'
              value={catchPhrase}
              onChange={this.onHandleChange('catchPhrase')}
            />
            <br />
            <TextField
              className={classes.textarea}
              label='Blog Post Content'
              multiline
              rows='8'
              value={content}
              onChange={this.onHandleChange('content')}
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
              variant='contained'
              color='primary'
            >
              Submit
            </Button>
          </form>
        </CardActions>
        <Divider />
        <Typography variant='headline'>Preview</Typography>
        <div className={classes.container}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={hasPreview ? file[0].preview : imgPath}
              title={title}
            />
            <CardContent>
              <Typography className={classes.title} variant='headline'>
                {title || 'title'}
              </Typography>
              <Typography className={classes.pos}>
                {catchPhrase || 'catchPhrase'}
              </Typography>
              <Typography variant='body1'>{content || 'content'}</Typography>
              <Typography variant='body2'>
                {moment(lastUpdatedDate).format('YYYY-MM-DD')}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Card>
    )
  }
}

export default withStyles(styles)(EditableBlogPost)
