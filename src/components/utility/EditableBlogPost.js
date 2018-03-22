import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

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

    // send users email data to backend
    fetch('/api/posts', options)
      .then(response => {
        return response.text()
      })
      .then(text => {
        // whats our response?
        console.log(text)

        // clear inputs
        this.setState({ title: '', content: '' })

        // navigate home
        // location.href = 'https://localhost:3000/'
      })
  }

  render () {
    return (
      <form onSubmit={this.onSubmitClick}>
        <h1>HEYYYYY</h1>
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
      </form>
    )
  }
}

export default EditableBlogPost
