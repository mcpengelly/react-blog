import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

export default class BlogSummary extends Component {
	render(){
		return (
			<Row>
				<article>
					<header>
						<a href={`/${this.props.id}`}><h1>{this.props.title}</h1></a>
					</header>
					<section>
						<p>{this.props.shortcontent}</p>
					</section>
				</article>
			</Row>
		);
	}
};
