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
// import RTEditor from './RTEditor'
import { baseURL } from '../../helpers/globals'
import { formatDate } from '../../helpers/helpers'
import BasicHtmlEditor from 'draft-js-basic-html-editor'

// const MyEditor = () => {
//   const initialHtml = 'hello, <b>World</b>';
//   const onEditorChange = html => this.setState({ content: html ]})

//   return (
//     <BasicHtmlEditor
//       value={ content }
//       onChange={ onEditorChange }
//       debounce={ 500 }
//     />
//   )
// }

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
      lastUpdatedDate: formatDate(new Date()),
      hasPreview: false,
      file: [{ preview: '' }],
      redirect: false
    }

    this.onEditorChange = html => this.setState({ content: html })
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
  }

  onDrop (acceptedFiles, rejectedFiles) {
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

            <hr />
            <BasicHtmlEditor
              value={content}
              onChange={this.onEditorChange}
              debounce={500}
            />
            <hr />
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
              <Typography variant='body1'>
                {this.state.editorState || 'content'}
              </Typography>
              <Typography variant='body2'>
                {lastUpdatedDate || 'lastUpdatedDate'}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Card>
    )
  }
}

export default withStyles(styles)(EditableBlogPost)
