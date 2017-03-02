import React, { Component } from 'react';
// import { StickyContainer, Sticky  } from 'react-sticky';
import { Row, Col } from 'react-bootstrap';
import { Affix, AutoAffix } from 'react-overlays';
import ProfileImage from './ProfileImage';
import SocialMediaIcons from './SocialMediaIcons';

//import image
import MeImage from '../../assets/img/me.png';

export default class SideBar extends Component {
	render() {
		return (
			<AutoAffix>
				<Col md={3}
					style={{
						backgroundColor: 'lightgrey',
						borderRadius: '10px'
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
				</Col>
			</AutoAffix>
		);
	}
};
