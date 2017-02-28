import React, { Component } from 'react';

export default class SideBar extends Component {
	render() {
		return (
			<div style={{ display: 'flex', justifyContent: 'center'}}>
				<div style={{ display: 'flex',
					justifyContent: 'center',
					backgroundColor: 'blue' }}>
					<p>testing 123123123123123123123123123123123123123123123123123123123123123123123123123123123123asdad23123123123123123123123123123123123123123123123123123123123123123123123123asdad</p>
				</div>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<aside style={{
						display: 'flex',
						justifyContent: 'center',
						flexFlow: 'column nowrap',
						backgroundColor: 'white',
						borderStyle: 'solid',
						borderColor: 'black'
					}}>
						<p>testing 123123123123123123123</p>
					</aside>
				</div>
			</div>
		);
	}
};
