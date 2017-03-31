import React, { Component } from 'react';

export default class A extends Component {

	render(){
		const style = { padding: '5px' };
		return (
			<a href={this.props.linkTo} style={style}>
				{this.props.children}
			</a>
		);
	}
};


