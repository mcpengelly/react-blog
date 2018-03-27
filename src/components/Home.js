import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import BlogContainer from './utility/BlogContainer'
import BlogPost from './utility/BlogPost'
import EditableBlogPost from './utility/EditableBlogPost'

// enable this versus in child component, container styles should be top level.
// const styles = {
//   card: {
//     minWidth: 275,
//     maxWidth: 875,
//     margin: 'auto'
//   }
// }

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      blogPosts: []
    }
  }

  componentDidMount () {
    // request blog posts from server
    fetch('/api/posts')
      // .then(response => {
      //   return response.json()
      // })
      .then(text => {
        console.log(text)
        text = [
          {
            id: 1,
            title: 'testing 123',
            content: 'something was typed in here'
          },
          {
            id: 2,
            title: 'testing 123',
            content: 'something was typed in here'
          },
          {
            id: 3,
            title: 'testing 123',
            content: 'something was typed in here'
          }
        ]
        this.setState({
          blogPosts: text
        })
      })
      .catch(error => {
        throw error
      })
  }

  render () {
    return (
      <Switch>
        <Route exact path='/:id' component={BlogPost} />
        <Route path='/:id/edit' component={EditableBlogPost} />
        <BlogContainer posts={this.state.blogPosts} />
      </Switch>
    )
  }
}
