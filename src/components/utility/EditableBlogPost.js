import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Card, { CardContent, CardMedia, CardActions } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import { BrowserRouter as Router } from 'react-router-dom'
import { Redirect } from 'react-router'
import uuidv4 from 'uuidv4'
import Dropzone from 'react-dropzone'
import BlogPost from './BlogPost'
import Paper from 'material-ui/Paper'

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

    const { title, catchPhrase, content, isNew } = props

    this.state = {
      id: props.id || '',
      title: '',
      content: '',
      catchPhrase: '',
      isNew: isNew || false,
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
    console.log('this.state', this.state)

    let data = {
      id: !this.state.isNew ? this.state.id : uuidv4(),
      title: this.state.title,
      content: this.state.content,
      catchPhrase: this.state.catchPhrase,
      file: this.state.file[0] // should do this better
    }

    // for sending multipart/form-data
    let formData = new FormData()
    for (let name in data) {
      formData.append(name, data[name])
    }

    // hit different endpoints with POST/PUT based on if its new or not
    const url = this.state.isNew ? '/api/posts' : `/api/posts/${this.state.id}`
    const options = {
      method: this.state.isNew ? 'POST' : 'PUT',
      body: formData
    }

    // const options = {
    //   method: this.state.isNew ? 'POST' : 'PUT',
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // }

    fetch(url, options)
      .then(response => {
        return response.text()
      })
      .then(text => {
        console.log('text', text)
        // clear inputs
        this.setState({
          id: '',
          title: '',
          content: '',
          catchPhrase: '',
          file: [{ preview: '' }],
          img: '',
          redirect: true
        })
      })
  }

  onDrop (acceptedFiles, rejectedFiles) {
    this.setState({
      file: acceptedFiles
    })
  }

  componentDidMount (props) {
    const { isNew, title, catchPhrase, content, img } = this.props

    // if its not a new record then fetch existing data from backend
    if (!isNew) {
      this.setState({
        title,
        catchPhrase,
        content,
        img
      })
    }
  }

  render () {
    const { classes } = this.props

    if (this.state.redirect) {
      return <Redirect to='/blog' />
    }

    return (
      <Card className={classes.card}>
        <CardActions>
          <form className={classes.form}>
            <TextField
              className={classes.textfield}
              label='Blog Post Title'
              value={this.state.title}
              onChange={this.onHandleChange('title')}
            />
            <br />
            <TextField
              className={classes.textfield}
              label='Catch phrase'
              value={this.state.catchPhrase}
              onChange={this.onHandleChange('catchPhrase')}
            />
            <br />
            <TextField
              className={classes.textarea}
              label='Blog Post Content'
              multiline
              rows='8'
              value={this.state.content}
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
          <BlogPost
            title={this.state.title}
            catchPhrase={this.state.catchPhrase}
            content={this.state.content}
            img={this.state.img}
          />
        </div>
      </Card>
    )
  }
}

export default withStyles(styles)(EditableBlogPost)
