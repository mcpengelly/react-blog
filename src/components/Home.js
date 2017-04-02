import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import request from 'request';

import BlogContainer from './utility/BlogContainer';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blogPosts: []
		};
	}
	componentDidMount() {
		// request blog posts from server
		const url = 'http://localhost:9000/api/posts';

		request.get(url, (err, res, body) => {
			if(err) {
				throw err;
			}

			this.setState({
				blogPosts: JSON.parse(body)
			});
		});
	}

	render() {
		const style = {
			margin: '0 auto',
			maxWidth: '50em',
			backgroundColor: 'white'
		};

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
