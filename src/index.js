import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from './App'
import Home from './components/Home'
import About from './components/About'
import Portfolio from './components/Portfolio'
import BlogPost from './components/BlogPost'
import EditableBlogPost from './components/EditableBlogPost'
import './index.css'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path='/' component={Home}>
        <Route path='/:id' component={BlogPost}>
          <Route path='/edit' component={EditableBlogPost} />
        </Route>
      </Route>
      <Route path='/about' component={About} />
      <Route path='/portfolio' component={Portfolio} />
    </Route>
  </Router>,
  document.getElementById('root')
)
