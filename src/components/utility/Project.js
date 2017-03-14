import React, { Component } from 'react';
import { Accordion, Panel } from 'react-bootstrap';

export default class PortfolioItem extends Component {

    render(){
        return (
            <Accordion>
                <Panel key={this.props.index}
                    header={this.props.header}
                    eventKey={this.props.index}>
                        <img src={this.props.img} alt='project'></img>
                        <p>{this.props.description}</p>
                </Panel>
            </Accordion>
        );
    }
};


