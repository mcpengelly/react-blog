import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import uuidv4 from 'uuidv4'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Card, { CardContent, CardMedia, CardActions } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'

import BlogPost from './BlogPost'

// TODO: use/leverage draftjs RTE for adding styles to blog posts with html
// TODO: make image upload part of the preview
// TODO: navigate home after submission

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
    console.log(this.props)

    this.props.addPost(this.state)

    this.setState({
      redirect: true
    })

    // const { isNew, id, title, content, catchPhrase, file } = this.state

    // let data = {
    //   id: !isNew ? id : uuidv4(),
    //   title: title,
    //   content: content,
    //   catchPhrase: catchPhrase,
    //   file: file[0] // should do this better
    // }

    // // for sending multipart/form-data
    // let formData = new FormData()
    // for (let name in data) {
    //   formData.append(name, data[name])
    // }

    // // hit different endpoints with POST/PUT based on if its new or not
    // const url = isNew ? '/api/posts' : `/api/posts/${id}`
    // const options = {
    //   method: isNew ? 'POST' : 'PUT',
    //   body: formData
    // }

    // fetch(url, options)
    //   .then(response => {
    //     return response.text()
    //   })
    //   .then(text => {
    //     // clear inputs
    //     this.setState({
    //       id: '',
    //       title: '',
    //       content: '',
    //       catchPhrase: '',
    //       file: [{ preview: '' }],
    //       redirect: true
    //     })
    //   })
  }

  onDrop (acceptedFiles, rejectedFiles) {
    this.setState({
      file: acceptedFiles,
      hasPreview: true
    })
  }

  componentDidMount (props) {
    const { isNew, id, title, catchPhrase, content, img } = this.props

    // if its not a new record then fetch existing data from backend
    if (!isNew) {
      this.setState({
        id,
        title,
        catchPhrase,
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
      img,
      file,
      hasPreview
    } = this.state

    console.log('this.state', this.state)

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
              variant='raised'
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
              image={
                hasPreview ? file[0].preview : `http://localhost:4000/${img}`
              }
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
            </CardContent>
          </Card>
        </div>
      </Card>
    )
  }
}

export default withStyles(styles)(EditableBlogPost)
