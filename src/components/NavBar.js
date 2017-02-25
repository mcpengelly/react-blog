import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NavBar extends Component {
	render() {
		return (
			<div>
				<Link to="/">Home</Link> |
				<Link to="/about">About</Link> |
				<Link to="/portfolio">Portfolio</Link>
			</div>
		);
	}
};