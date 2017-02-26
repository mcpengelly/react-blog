import React, { Component } from 'react';

/**
 * Kindof hack-y way of creating a vertical line in the browser, might not work on earlier IE versions also may have some graphical issues
 */
export default class VerticalLine extends Component {
	render(){
		return (
			<hr width="1" size={this.props.height} style={{display: 'inline-block'}} />
		);
	}
}
