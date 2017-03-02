import React, { Component } from 'react';
import './App.css';

import NavBar from './components/utility/NavBar';
import Footer from './components/utility/Footer';
import {Grid} from 'react-bootstrap';
/* Background pattern from Subtle Patterns */
import backgroundImage from './assets/img/escheresque_@2X.png';

class App extends Component {
	render() {
		return (
			<div className="App" style={{ backgroundImage: "url(" + backgroundImage + ")" }}>
				<NavBar />
				<div className="App-header">

					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>

					<h2>Welcome</h2>

				</div>

				<Grid className="App-intro">
					{this.props.children}
				</Grid>

				<Footer copyright="Matt Pengelly"/>
			</div>
		);
	}
}

export default App;
