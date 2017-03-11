import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import BlogPost from './BlogPost';

//TODO: import list of projects from a .json/.js file
export default class BlogContainer extends Component {
	render(){
		let blogPosts = this.props.posts.map((post, index) => {
			return (
				<div key={index}>
					<BlogPost title={post.title} body={post.body} />
				</div>
			);
		});

		return (
			<Col sm={9}>
				{blogPosts}
			</Col>
		);
	}
};

