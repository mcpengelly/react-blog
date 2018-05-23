import React, { Component } from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import { CircularProgress } from 'material-ui/Progress'
import uuidv4 from 'uuidv4'

import BlogSummaryList from './utility/BlogSummaryList'
import BlogPost from './utility/BlogPost'
import EditableBlogPost from './utility/EditableBlogPost'

function withBlogPostData (WrappedComponent, callback1, callback2) {
  return class BlogPostContainer extends React.Component {
    constructor () {
      super()
      this.state = {
        title: '',
        content: '',
        catchPhrase: '',
        img: '',
        pageIsReady: false
      }
    }

    componentDidMount () {
      fetch(`/api/posts/${this.props.match.params.id}`)
        .then(res => {
          return res.json()
        })
        .then(blogPost => {
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
          addPost={callback1}
          removePost={callback2}
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

    this.addPost = this.addPost.bind(this)
    this.removePost = this.removePost.bind(this)
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

  removePost (postId) {
    const options = { method: 'delete' }

    fetch(`/api/posts/${postId}`, options).then(() => {
      this.setState({
        blogPosts: this.state.blogPosts.filter(post => post.id !== postId)
      })
    })
  }

  addPost (post) {
    const { id, isNew, title, catchPhrase, content, img, file } = post

    const data = {
      id: !isNew ? id : uuidv4(),
      title: title,
      catchPhrase: catchPhrase,
      img: img,
      content: content,
      file: file[0] // should do this better
    }

    // for sending multipart/form-data
    let formData = new FormData()
    for (let name in data) {
      formData.append(name, data[name])
    }

    const url = isNew ? '/api/posts' : `/api/posts/${id}`

    const options = {
      method: isNew ? 'POST' : 'PUT',
      body: formData
    }

    console.log('Home state', this.state)
    fetch(url, options)
      .then(response => {
        return response.text()
      })
      .then(() => {
        if (isNew) {
          this.setState({
            blogPosts: this.state.blogPosts.concat({
              ...data,
              img: file[0].name
            })
          })
        } else {
          this.setState({
            blogPosts: this.state.blogPosts.map(p => {
              // when we find a match replace its data
              if (post.id === p.id) {
                return {
                  ...post,
                  img: file[0].name || img
                }
              }
              return p
            })
          })
        }
      })
  }

  render () {
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          render={() => {
            return (
              <BlogSummaryList
                posts={this.state.blogPosts}
                removePost={this.removePost}
              />
            )
          }}
        />
        <Route
          exact
          path={`${this.props.match.url}/:id`}
          component={withBlogPostData(BlogPost, this.addPost, this.removePost)}
        />
        <Route
          exact
          path={`${this.props.match.url}/:id/edit`}
          component={withBlogPostData(
            EditableBlogPost,
            this.addPost,
            this.removePost
          )}
        />
        <Route
          exact
          path={`${this.props.match.url}/new/post`}
          render={() => {
            return <EditableBlogPost isNew addPost={this.addPost} />
          }}
        />
      </Switch>
    )
  }
}

export default Home
