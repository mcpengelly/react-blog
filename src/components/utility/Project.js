import React, { Component } from 'react';
import { Accordion, Panel } from 'react-bootstrap';

export default class PortfolioItem extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Accordion>
				<Panel
					key={this.props.index}
					header={this.props.header}
					eventKey={this.props.index}
				>
					<img
						style={{ width: '50px', height: '50px' }}
						src={this.props.img}
						alt="project"
					/>
					<p>{this.props.description}</p>
				</Panel>
			</Accordion>
		);
	}
}
