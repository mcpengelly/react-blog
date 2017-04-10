import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NavBar extends Component {
	render() {
		return (
			<header className="navbar">
				<Link className="navbar-link" to="/">Home</Link> |
				<Link className="navbar-link" to="/about">About</Link> |
				<Link className="navbar-link" to="/portfolio">Portfolio</Link>
			</header>
		);
	}
};
