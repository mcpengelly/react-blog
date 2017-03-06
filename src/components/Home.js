import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap'
import request from 'request';

import SideBar from './utility/SideBar';
import BlogContainer from './utility/BlogContainer';


export default class Home extends Component {
	constructor(props){
		super(props);
		this.state = {
			blogPosts: []
		};
	}
	componentDidMount(){
		//make ajax request for portfolio items
		//setup using a fake json api for now
		const root = 'https://jsonplaceholder.typicode.com';
		const url = root + '/posts';

		request.get(url, (err, res, body) => {
			if(err) {
				throw new Error('Url could not be resolved');
			}
			this.setState({
				blogPosts: JSON.parse(body)
			});
		});
	}

	render(){
		return (
			<div>
				<Grid>
					<Row className="show-grid">
						<div>
							<BlogContainer posts={this.state.blogPosts}/>
						</div>
						<div>
							<SideBar />
						</div>
					</Row>
				</Grid>
			</div>
		);
	}
};
