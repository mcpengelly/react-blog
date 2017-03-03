import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import BlogPost from './BlogPost';
import blogPosts from '../data/BlogPosts';;

//TODO: import list of projects from a .json/.js file
export default class BlogContainer extends Component {
	render(){
		let blogItems = blogPosts.map((post) => {
			return (
				<div style={{
					margin: '10px',
					borderRadius: '10px',
					backgroundColor:'white'
				}}>
					<BlogPost title={post.title} body={post.body} />
				</div>
			);
		});

		return (
			<Col sm={9}>
				{blogItems}
			</Col>
		);
	}
};
