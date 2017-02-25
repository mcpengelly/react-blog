import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './App';
import Home from './components/Home';
import About from './components/About';
import Portfolio from './components/Portfolio';
import './index.css';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<Route path="/" component={Home} />
			<Route path="/about" component={About} />
			<Route path="/portfolio" component={Portfolio} />
		</Route>
	</Router>,
	document.getElementById('root')
);
