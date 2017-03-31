import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './App';
import Home from './components/Home';
import About from './components/About';
import Portfolio from './components/Portfolio';
import './index.css';

import BlogPost from './components/utility/BlogPost';

const Child = ({ match }) => (
	<div>
		<h3>ID: {match.params.posttitle}</h3>
	</div>
);

ReactDOM.render(
	<Router history={browserHistory}>
		<Route component={App}>
			<Route path="/" component={Home} />
			<Route path="/about" component={About} />
			<Route path="/portfolio" component={Portfolio} />
			<Route path="/:posttitle" component={Child} />
		</Route>
	</Router>,
	document.getElementById('root')
);


