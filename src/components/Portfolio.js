import React, { Component } from 'react';
import Logo from '../logo.svg';

import FlexBoxGridItem from './utility/FlexBoxGridItem';
import FlexBoxWrappedRowGrid from './utility/FlexBoxWrappedRowGrid';

export default class Portfolio extends Component {
	render(){

		return (
			<div>
				<h1>Portfolio Page</h1>
				<h2>Programming</h2>

				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<FlexBoxWrappedRowGrid>
						<FlexBoxGridItem imageSrc={Logo}/>
						<FlexBoxGridItem imageSrc={Logo}/>
						<FlexBoxGridItem imageSrc={Logo}/>
						<FlexBoxGridItem imageSrc={Logo}/>
						<FlexBoxGridItem imageSrc={Logo}/>
						<FlexBoxGridItem imageSrc={Logo}/>
						<FlexBoxGridItem imageSrc={Logo}/>
						<FlexBoxGridItem imageSrc={Logo}/>
					</FlexBoxWrappedRowGrid>
				</div>

				<h2>Other</h2>
			</div>
		);
	}
};

