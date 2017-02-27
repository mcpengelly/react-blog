import React, { Component } from 'react';

export default class FlexBoxWrappedRowGrid extends Component{
	render() {
		return (
			<div style={{
				backgroundColor: 'grey',
				width: '700px',
				display: 'flex',
				justifyContent: 'flex-start',
				flexFlow: 'row wrap'
			}}>
				{this.props.children}
			</div>
		);
	}
}
