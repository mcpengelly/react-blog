import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import BlogContainer from './utility/BlogContainer'
import BlogPost from './utility/BlogPost'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'

// enable this versus in child component? container styles should be top level.
const styles = {
  paper: {
    minWidth: 275,
    maxWidth: 875
    // margin: 'auto'
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
    // request blog posts from server
    fetch('/api/posts')
      .then(response => {
        return response.json()
      })
      .then(text => {
        console.log(text)

        this.setState({
          blogPosts: text
        })
      })
      .catch(error => {
        throw error
      })
  }

  // might need div/paper here
  render () {
    console.log('Home', this.props.match.url)
    return (
      <div className={this.props.classes.paper}>
        <Route path={`${this.props.match.url}/:id`} component={BlogPost} />
        <BlogContainer posts={this.state.blogPosts} />
      </div>
    )
  }
}
export default withStyles(styles)(Home)
