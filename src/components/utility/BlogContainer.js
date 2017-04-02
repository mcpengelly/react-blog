import React, { Component } from 'react';
import BlogPost from './BlogPost';

export default class BlogContainer extends Component {
	render(){
		const hrStyle = { borderColor: 'lightgrey' };

		let blogPosts = this.props.posts.map((post, index) => {
			return (
				<div key={index}>
					<BlogPost
						id={post.id}
						title={post.title}
						content={post.content}
					/>
					<hr style={hrStyle} />
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

