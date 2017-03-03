import React, { Component } from 'react';

//TODO: load an icon for the external links
export default class A extends Component {
	render(){
		return (
			<a href={this.props.linkTo} style={{padding: '5px'}}>
				{this.props.children}
			</a>
		);
	}
};


