import React, { Component } from 'react';
// import { StickyContainer, Sticky  } from 'react-sticky';
import { Row, Col } from 'react-bootstrap';
import ProfileImage from './ProfileImage';
import SocialMediaIcons from './SocialMediaIcons';

//import image
import MeImage from '../../assets/img/me.png';

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
