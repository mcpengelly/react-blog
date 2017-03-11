import React, { Component } from 'react';
import BlogPost from './BlogPost';

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
			<div>
				{blogPosts}
			</div>
		);
	}
};

