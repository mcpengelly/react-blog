import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import ProfileImage from './ProfileImage';
import SocialMediaIcons from './SocialMediaIcons';

//import image
import MeImage from '../../assets/img/me.png';

export default class SideBar extends Component {
	render() {
		return (
			<Col style={{ backgroundColor: 'lightgrey', borderRadius: '10px' }} md={3}>
				<Row style={{padding: '10px'}}>
					<ProfileImage source={MeImage}></ProfileImage>
				</Row>
				<Row style={{padding: '10px'}}>
					<SocialMediaIcons />
				</Row>

				<Row>
					<p>Latest Posts</p>
					<p>Most Viewed</p>
					<p>Oldest Posts</p>
				</Row>
			</Col>
		);
	}
};

// <Row>{this.props.children}</Row>
