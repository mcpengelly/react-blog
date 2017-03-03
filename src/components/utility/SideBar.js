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
			<Col className="sticky-sidebar" sm={3}>
				<div style={{
					margin: '10px',
					position: 'fixed',
					borderRadius: '10px',
					backgroundColor: 'lightgrey'
				}}>
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
				</div>
			</Col>
		);
	}
};
