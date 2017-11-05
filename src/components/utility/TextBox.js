import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class TextBox extends Component {
	render() {
		return (
			<FormGroup>
				<ControlLabel>{this.props.caption}</ControlLabel>
				<FormControl
					type="text"
					value={this.props.value}
					onChange={this.props.handleChange}
					placeholder="Enter text"
				/>
			</FormGroup>
		);
	}
}

export default TextBox;
