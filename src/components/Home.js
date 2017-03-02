import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap'

import SideBar from './utility/SideBar';
import BlogContainer from './utility/BlogContainer';

export default class Home extends Component {
	render(){
		return (
			<div>
				<Grid>
					<Row className="show-grid">
						<BlogContainer />
						<SideBar />
					</Row>
				</Grid>
			</div>
		);
	}
};
