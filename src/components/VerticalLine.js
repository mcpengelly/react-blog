import React, { Component } from 'react';

export default class VerticalLine extends Component {
	render(){
		return (
			<hr width="1" size={this.props.height} style={{display: 'inline-block'}} />
		);
	}
}
