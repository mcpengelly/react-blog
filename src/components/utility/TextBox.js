import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class TextBox extends Component {
	render() {
		return (
			<FormGroup style={{ padding: 0, margin: 0  }}>
				<ControlLabel>{this.props.caption}</ControlLabel>
				<FormControl type="text" style={{ width: '50%' }} placeholder="Enter text" />
			</FormGroup>
		);
	}
};

TextBox.defaultProps = {
	caption: '? No caption was supplied ?',
	fieldName: '? No caption was supplied ?'
};

TextBox.propTypes = {
	caption: React.PropTypes.string,
	fieldName: React.PropTypes.string
};

export default TextBox;
