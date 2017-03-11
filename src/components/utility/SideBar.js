import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export default class SideBar extends Component {
	render() {
		return (
			<Col sm={3}>
				<div>
					<Row>
						<p>Latest Posts</p>
						<p>Most Viewed</p>
						<p>Oldest Posts</p>
					</Row>
				</div>
			</Col>
		);
	}
};
