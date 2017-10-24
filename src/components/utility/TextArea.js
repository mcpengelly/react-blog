import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class TextArea extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	render() {
		return (
			<FormGroup>
				<ControlLabel>{this.props.caption}</ControlLabel>
				<FormControl
					componentClass="textarea"
					bsSize="large"
					placeholder="Enter text"
					value={this.state.value}
					onChange={this.handleChange.bind(this)}
				/>
			</FormGroup>
		);
	}
}

// deprecated
// TextArea.defaultProps = {
// 	caption: '???',
// 	fieldName: '???'
// };

// TextArea.propTypes = {
// 	caption: React.PropTypes.string,
// 	fieldName: React.PropTypes.string
// };

export default TextArea;
