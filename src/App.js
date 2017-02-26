import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import NavBar from './components/utility/NavBar';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<NavBar />
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome</h2>
				</div>
				{this.props.children}
				<p className="App-intro">
					Lorem Ipsum Lorem Ipsum Lorem Ipsum
				</p>
			</div>
		);
	}
}

export default App;
