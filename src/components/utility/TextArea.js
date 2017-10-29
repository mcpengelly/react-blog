import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class TextArea extends Component {
	render() {
		return (
			<FormGroup>
				<ControlLabel>{this.props.caption}</ControlLabel>
				<FormControl
					componentClass="textarea"
					bsSize="large"
					placeholder="Enter text"
					value={this.props.value}
					onChange={this.props.handleChange}
				/>
			</FormGroup>
		);
	}
}

export default TextArea;
