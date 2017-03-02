import React, { Component } from 'react';

class FlexBoxGridItem extends Component {
	render() {
		return (
			<a href={this.props.linkTo}>
				<img src={this.props.imageSrc} alt=""
					style={{
						padding: '5px',
						width: this.props.width,
						height: this.props.height
					}}
				/>
			</a>
		);
	}
}

FlexBoxGridItem.defaultProps = {
	linkTo: null,
	width: '100px',
	height: '100px',
	imageSrc: null
};

export default FlexBoxGridItem;
