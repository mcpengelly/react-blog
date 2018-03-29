import React, { Component } from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

import BlogContainer from './utility/BlogContainer'
import BlogPost from './utility/BlogPost'
import EditableBlogPost from './utility/EditableBlogPost'

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
      .then(response => {
        return response.json()
      })
      .then(text => {
        console.log(text)

        // text = [
        //   {
        //     id: 1,
        //     title: 'testing 123',
        //     content: 'something was typed in here'
        //   },
        //   {
        //     id: 2,
        //     title: 'testing 123',
        //     content: 'something was typed in here'
        //   },
        //   {
        //     id: 3,
        //     title: 'testing 123',
        //     content: 'something was typed in here'
        //   }
        // ] // testing data

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
        <Route
          exact
          path={`${this.props.match.url}/:id`}
          component={BlogPost}
        />
        <Route
          exact
          path={`${this.props.match.url}/:id/edit`}
          component={EditableBlogPost}
        />
        <Route
          exact
          path={`${this.props.match.url}/new/post`}
          render={() => {
            return <EditableBlogPost isNew />
          }}
        />
        <BlogContainer posts={this.state.blogPosts} />
      </Switch>
    )
  }
}
