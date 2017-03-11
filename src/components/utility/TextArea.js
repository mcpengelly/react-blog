import React, { Component } from 'react';

class TextArea extends Component {
	render() {
		return (
			<label>
				{this.props.caption}:
				<br />
				<textarea
					rows="4"
					cols="30"
					name={this.props.fieldName}>
				</textarea>
			</label>
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