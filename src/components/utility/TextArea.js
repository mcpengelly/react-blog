import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class TextArea extends Component {
	render() {
		return (
			<FormGroup>
				<ControlLabel>{this.props.caption}</ControlLabel>
				<FormControl componentClass="textarea" bsSize="large" placeholder="Enter text" />
			</FormGroup>
		);
	}
};

TextArea.defaultProps = {
	caption: '???',
	fieldName: '???'
};

TextArea.propTypes = {
	caption: React.PropTypes.string,
	fieldName: React.PropTypes.string
};

export default TextArea;