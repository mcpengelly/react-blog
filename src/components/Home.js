import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import request from 'request';

import SideBar from './utility/SideBar';
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
				throw new Error('Url could not be resolved');
			}

			this.setState({
				blogPosts: JSON.parse(body)
			});
		});
	}

	render() {
		return (
			<Grid>
				<Row className="show-grid" >
					<Col sm={9} style={{ backgroundColor: 'white' }}>
						<BlogContainer posts={this.state.blogPosts}  />
					</Col>
					<Col sm={3} style={{ backgroundColor: 'white' }}>
						<SideBar />
					</Col>
				</Row>
			</Grid>
		);
	}
};
