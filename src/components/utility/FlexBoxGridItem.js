import React, { Component } from 'react';

class FlexBoxGridItem extends Component {
	render() {
		return (
			<a href={this.props.linkTo}>
				<img src={this.props.imageSrc}
					style={{ padding: '5px',
						width: this.props.width,
						height: this.props.height }}
					alt=""
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
