import React, { Component } from 'react';

import SideBar from './utility/SideBar';

export default class Home extends Component {
	render(){
		return (
			<div>
				<h1>Home Page</h1>
				<SideBar />
			</div>
		);
	}
};
