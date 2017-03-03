import React, { Component } from 'react';

class TextBox extends Component {
	render() {
		return (
			<label>
				{this.props.caption}:
				<input type="text" name={this.props.fieldName} />
			</label>
		);
	}
};

TextBox.defaultProps = {
	caption: '? No caption was supplied ?'
};

export default TextBox;
