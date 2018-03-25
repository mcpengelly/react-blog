import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class EditableBlogPost extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      content: ''
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

    const options = {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch('/api/posts', options)
      .then(response => {
        return response.text()
      })
      .then(text => {
        // whats our response?
        console.log(text)

        // clear inputs
        // this.setState({ title: '', content: '' })

        // navigate home
        // location.href = 'https://localhost:3000/'
      })
  }

  render () {
    return (
      <form onSubmit={this.onSubmitClick}>
        <h1>TEST</h1>
        <TextField
          label='Blog Post Title'
          value={this.state.title}
          onChange={this.onHandleChange('title')}
        />
        <TextField
          label='Blog Post Content'
          multiline
          rows='8'
          value={this.state.content}
          onChange={this.onHandleChange('content')}
        />
        <Button
          onClick={this.addNewSubscriberNotification}
          variant='raised'
          color='primary'
        >
          Submit
        </Button>
        <Route path={`${this.props.url}/edit`} component={EditableBlogPost} />
      </form>
    )
  }
}

export default EditableBlogPost
