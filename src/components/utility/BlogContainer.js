import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

//TODO: import list of projects from a .json/.js file
export default class BlogContainer extends Component {
	render(){
		return (
			<div>
				<Col style={{backgroundColor: 'blue'}} md={9}>

					<Row>
						<article>
							<h1>Placeholder Title</h1>
							<p>Bacon ipsum dolor amet kielbasa pancetta tenderloin biltong cupim pork loin. Shoulder kielbasa shank turducken tail pork loin chuck tenderloin boudin shankle. Tenderloin pastrami burgdoggen pork, shankle landjaeger picanha tri-tip shoulder frankfurter beef ribs brisket. Boudin porchetta ball tip rump. Short loin swine pastrami beef leberkas.
							</p>
						</article>
					</Row>

					<Row>
						<h1>Placeholder Title</h1>
						<p>Porchetta burgdoggen tail, kevin pancetta turducken frankfurter. Porchetta sirloin tongue, cupim burgdoggen flank cow. Turducken short ribs prosciutto kevin swine sirloin cow landjaeger burgdoggen short loin biltong strip steak meatball. Ground round turkey bresaola short loin, hamburger alcatra swine porchetta salami prosciutto chicken. Flank swine rump
						</p>
					</Row>

					<Row>
						<h1>Placeholder Title</h1>
						<p>Prosciutto fatback t-bone sausage, shoulder chicken beef tri-tip short loin beef ribs. Pastrami ham hock salami, alcatra burgdoggen meatball t-bone pork chop bacon tenderloin turducken picanha leberkas beef. Jowl cupim pork loin tenderloin short ribs chuck kevin meatball pork belly filet mignon strip steak porchetta pig brisket. Doner corned beef
						</p>
					</Row>
				</Col>
			</div>
		);
	}
};


