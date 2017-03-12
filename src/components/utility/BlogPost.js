import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import { A } from './A';

export default class BlogPost extends Component {
	render(){
		return (
			<Row>
				<article>
					<header>
						<a href="https://google.com"><h1>{this.props.title}</h1></a>
					</header>
					<section>
						<p>{this.props.shortcontent}</p>
					</section>
				</article>
			</Row>
		);
	}
};
