import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class TextBox extends Component {
	constructor(props){
		super(props);
		this.state = { value: '' };
	}

	handleChange(e){
		this.setState({ value: e.target.value });
	}

	render() {
		return (
			<FormGroup style={{ padding: 0, margin: 0  }}>
				<ControlLabel>{this.props.caption}</ControlLabel>
				<FormControl
					controlId={this.props.fieldName}
					type="text"
					value={this.state.value}
					onChange={this.handleChange.bind(this)}
					placeholder="Enter text"
				/>
			</FormGroup>
		);
	}
};

// deprecated TODO: use new syntax
// TextBox.defaultProps = {
// 	caption: '? No caption was supplied ?',
// 	fieldName: '? No caption was supplied ?'
// };

// TextBox.propTypes = {
// 	caption: React.PropTypes.string,
// 	fieldName: React.PropTypes.string
// };

export default TextBox;
