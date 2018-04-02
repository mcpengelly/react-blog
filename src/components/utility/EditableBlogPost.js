import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Card, { CardContent, CardMedia, CardActions } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import { BrowserRouter as Router } from 'react-router-dom'
import uuidv4 from 'uuidv4'
import Dropzone from 'react-dropzone'
import BlogPost from './BlogPost'
import Paper from 'material-ui/Paper'

// TODO: use/leverage draftjs RTE for adding styles to blog posts with html
// TODO: make image upload part of the preview
// TODO: navigate home after submission
// TODO: some code duplication exists between BlogPost and EditableBlogPost via the Preview, could refactor this

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 875,
    margin: 'auto',
    padding: 10
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
      file: [{ preview: '/placeholder' }]
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

    let data = {
      id: this.state.id,
      title: this.state.title,
      content: this.state.content,
      catchPhrase: this.state.catchPhrase,
      file: this.state.file
    }

    // hit different endpoints with POST/PUT based on if its new or not
    const url = this.state.isNew ? '/api/posts' : `/api/posts/${this.state.id}`

    const options = {
      method: this.state.isNew ? 'POST' : 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(url, options)
      .then(response => {
        return response.text()
      })
      .then(text => {
        // whats our response?
        // console.log(text)

        // clear inputs
        this.setState({
          id: '',
          title: '',
          content: '',
          catchPhrase: '',
          file: [{ preview: '/placeholder' }]
        })

        // navigate home
        // location.href = 'https://localhost:3000/'
      })
  }

  onDrop (acceptedFiles, rejectedFiles) {
    this.setState({
      file: acceptedFiles
    })
    // maybe post/put request here?
  }

  componentWillMount (props) {
    const { title, catchPhrase, content } = this.props
    // if its not a new record then fetch existing data from backend
    // if (!this.props.isNew) {
    this.setState({
      title,
      catchPhrase,
      content
    })
    // }
  }

  render () {
    const { classes } = this.props

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
        <BlogPost
          title={this.state.title}
          catchPhrase={this.state.catchPhrase}
          content={this.state.content}
          img={this.state.file[0].preview}
        />
      </Card>
    )
  }
}
/*
  <CardMedia
    className={classes.media}
    image={this.state.file[0].preview}
    title='bang'
  />
*/
export default withStyles(styles)(EditableBlogPost)
