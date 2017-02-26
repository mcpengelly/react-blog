import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid/lib';

export default class Portfolio extends Component {
	render(){
		return (
			<div>
				<h1>Portfolio Page</h1>
				<h2>Programming</h2>
				<Grid>
					<Row>
						<Col xs={2} md={3}>Hello, world!</Col>
						<Col xs={2} md={3}>Hello, world!</Col>
					</Row>
					<Row>
						<Col xs={12} sm={3} md={2} lg={1} />
						<Col xs={6} sm={6} md={8} lg={10} />
						<Col xs={6} sm={3} md={2} lg={1} />
					</Row>
					<Col xs={6} md={3}>Hello, world!</Col>
				</Grid>
				<h2>Other</h2>
			</div>
		);
	}
};

