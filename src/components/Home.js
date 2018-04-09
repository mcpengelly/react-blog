import React, { Component } from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

import BlogSummaryList from './utility/BlogSummaryList'
import BlogPost from './utility/BlogPost'
import EditableBlogPost from './utility/EditableBlogPost'
import { CircularProgress } from 'material-ui/Progress'

function withBlogPostData (WrappedComponent) {
  return class BlogPostContainer extends React.Component {
    constructor () {
      super()
      this.state = {
        title: '',
        content: '',
        catchPhrase: '',
        pageIsReady: false
      }
    }

    componentDidMount () {
      fetch(`/api/posts/${this.props.match.params.id}`)
        .then(res => {
          return res.json()
        })
        .then(blogPost => {
          console.log(blogPost, 'blogPost')
          this.setState({
            title: blogPost.title,
            content: blogPost.content,
            catchPhrase: blogPost.catchPhrase,
            img: blogPost.img,
            pageIsReady: true
          })
        })
    }

    render () {
      if (!this.state.pageIsReady) {
        return <CircularProgress />
      }

      return (
        <WrappedComponent
          id={this.props.match.params.id}
          title={this.state.title}
          content={this.state.content}
          catchPhrase={this.state.catchPhrase}
          img={this.state.img}
        />
      )
    }
  }
}

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      blogPosts: []
    }
  }

  componentDidMount () {
    fetch('/api/posts')
      .then(response => {
        return response.json()
      })
      .then(text => {
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
          path={`${this.props.match.url}`}
          render={() => {
            return <BlogSummaryList posts={this.state.blogPosts} />
          }}
        />
        <Route
          exact
          path={`${this.props.match.url}/:id`}
          component={withBlogPostData(BlogPost)}
        />
        <Route
          exact
          path={`${this.props.match.url}/:id/edit`}
          component={withBlogPostData(EditableBlogPost)}
        />
        <Route
          exact
          path={`${this.props.match.url}/new/post`}
          render={() => {
            return <EditableBlogPost isNew />
          }}
        />
      </Switch>
    )
  }
}

export default Home
