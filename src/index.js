import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './App'
import Home from './components/Home'
import About from './components/About'
import Portfolio from './components/Portfolio'
import './index.css'

ReactDOM.render(
  <Router>
    <App>
      <Route path='/blog' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/portfolio' component={Portfolio} />
    </App>
  </Router>,
  document.getElementById('root')
)
