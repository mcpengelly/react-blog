import React from 'react'
import ReactDOM from 'react-dom'
// import { Router, Route, browserHistory } from 'react-router'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import App from './App'
import Home from './components/Home'
import About from './components/About'
import Portfolio from './components/Portfolio'
import BlogPost from './components/utility/BlogPost'
import EditableBlogPost from './components/utility/EditableBlogPost'
import './index.css'

ReactDOM.render(
  <Router>
    <App>
      <Route path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/portfolio' component={Portfolio} />
    </App>
  </Router>,
  document.getElementById('root')
)
