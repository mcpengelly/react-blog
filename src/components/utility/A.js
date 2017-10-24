import React, { Component } from 'react';

const style = { padding: '5px' };

export default class A extends Component {
	render() {
		return (
			<a href={this.props.linkTo} style={style}>
				{this.props.children}
			</a>
		);
	}
}
