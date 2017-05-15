import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import request from 'request';

import BlogContainer from './utility/BlogContainer';

const HOSTNAME = process.argv.HOSTNAME;

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
		// v
		const url = HOSTNAME + '/api/posts';

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
