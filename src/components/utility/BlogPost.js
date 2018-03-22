import React, { Component } from 'react'
import { BrowserRouter as Link, Router, Route } from 'react-router-dom'
import EditableBlogPost from './EditableBlogPost'

class BlogPost extends Component {
  // onComponentWasMounted () {
  //   // fetch by id
  //   // //id can be looked up or mantained in state of parent by bubbling the state from the link clicked
  // }

  render () {
    console.log(this.props.match.url)
    return (
      <div>
        <Route
          path={`${this.props.match.url}/edit`}
          component={EditableBlogPost}
        />
      </div>
    )
  }
}

export default BlogPost
