import React, { Component } from 'react';
import { Accordion, Panel } from 'react-bootstrap';
// import anImage from '../../assets/img/uploads/e8bf2647c1d549d62756889763f514fc.jpg';
// import * as images from '../../assets/img/uploads/*.jpg';

export default class PortfolioItem extends Component {
	constructor(props){
		super(props);
		console.log('__dirname', __dirname);
		console.log(props.img);
	}
	render() {
		return (
			<Accordion>
				<Panel
					key={this.props.index}
					header={this.props.header}
					eventKey={this.props.index}
				>
					<img src={this.props.img} alt="project"></img>
					<p>{this.props.description}</p>
				</Panel>
			</Accordion>
		);
	}
}
