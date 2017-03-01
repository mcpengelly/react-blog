import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';


export default class SideBar extends Component {
	render() {
		return (
			<Col style={{backgroundColor: 'red'}} md={3}>
				hardcoded
			</Col>
		);
	}
};

// <Row>{this.props.children}</Row>
