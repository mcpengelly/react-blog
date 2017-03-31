import React, { Component } from 'react';
import BlogSummary from './BlogSummary';

export default class BlogContainer extends Component {
	render(){
		const style = { borderColor: 'lightgrey' };

		let blogPosts = this.props.posts.map((post, index) => {
			return (
				<div key={index}>
					<BlogSummary
						id={post.id}
						title={post.title}
						content={post.content}
						shortcontent={post.shortcontent}
					/>
					<hr style={style} />
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

