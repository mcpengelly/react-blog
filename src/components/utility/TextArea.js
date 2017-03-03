import React, { Component } from 'react';

export default class NavBar extends Component {
	render() {
		return (
			<label>
				{this.props.caption}:
				<br/>
				<textarea
					rows="4"
					cols="50"
					name={this.props.fieldName}>
				</textarea>
			</label>
		);
	}
};
