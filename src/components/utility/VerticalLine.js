import React, { Component } from 'react';

/**
 * Kindof hack-y way of creating a vertical line in the browser, might not work on earlier IE versions also may have some graphical issues
 */
class VerticalLine extends Component {
	render(){
		return <hr width="1" size={this.props.height} style={{display: 'inline-block'}} />
	}
}

VerticalLine.defaultProps = {
	height: 50
};

export default VerticalLine;
