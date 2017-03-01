import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap'

import SideBar from './utility/SideBar';
import BlogContainer from './utility/BlogContainer';

export default class Home extends Component {
	render(){
		return (
			<div>
				<h1>Home Page</h1>

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
