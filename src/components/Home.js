import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import request from 'request';
import 'whatwg-fetch'; //fetch

import BlogContainer from './utility/BlogContainer';

const style = {
	margin: '0 auto',
	maxWidth: '50em',
	backgroundColor: 'white'
};

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blogPosts: []
		};
	}
	componentDidMount() {
		// request blog posts from server
		fetch('/api/posts')
			.then((response) => {
				return response.json();
			})
			.then((text) => {
				// set state to list received from backend
				this.setState({
					blogPosts: JSON.parse(text)
				});
			})
			.catch((error) => {
				throw error;
			});

		// request.get(url, (err, res, body) => {
		// 	if(err) {
		// 		throw err;
		// 	}

		// 	this.setState({
		// 		blogPosts: JSON.parse(body)
		// 	});
		// });
	}

	render() {
		return (
			<Grid style={style}>
				<Row className="show-grid">
					<Col sm={12}>
						<BlogContainer posts={this.state.blogPosts} />
					</Col>
				</Row>
			</Grid>
		);
	}
};
