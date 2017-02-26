import React, { Component } from 'react';
import logo from './logo.svg';import './App.css';

import NavBar from './components/utility/NavBar';
import Footer from './components/utility/Footer';
import backgroundImage from './assets/img/small_steps.png';

class App extends Component {
	render() {
		return (
			<div className="App" style={{ backgroundImage: "url(" + backgroundImage + ")" }}>
				<div className="App-header">
					<NavBar />
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome</h2>
				</div>
				{this.props.children}
				<p className="App-intro">
					Lorem Ipsum Lorem Ipsum Lorem Ipsum
				</p>

				<Footer copyright="Matt Pengelly 2017"/>
			</div>
		);
	}
}

export default App;
