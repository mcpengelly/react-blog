import React, { Component } from 'react';

export default class NavBar extends Component {
	render() {
		return (
			<div>
				<a href="/">Home</a> |
				<a href="/about">About</a> |
				<a href="/portfolio">Portfolio</a>
			</div>
		);
	}
};
