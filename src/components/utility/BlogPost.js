import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

//TODO: import list of projects from a .json/.js file
export default class BlogPost extends Component {
	render(){
		return (
			<Row>
				<article>
					<header>
						<h1>{this.props.title}</h1>
					</header>
					<section>
						<p>{this.props.body}</p>
					</section>
				</article>
			</Row>
		);
	}
};
