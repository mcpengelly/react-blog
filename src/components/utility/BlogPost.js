import React, { Component } from 'react';

export default class BlogPost extends Component {
	render(){
		return (
			<div>
				<div>
					<h3>ID:</h3>
				</div>
				<article>
					<header>
						<h1>{this.props.title}</h1>
					</header>
					<section>
						<p>{this.props.content}</p>
					</section>
				</article>
			</div>
		);
	}
};
