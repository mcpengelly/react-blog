import React, { Component } from 'react';
import marked from 'marked';

// render from markdown
marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: true,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false
});

const style = { textAlign: 'left' };

export default class BlogSummary extends Component {

	constructor(props, context) {
		super(props, context);
		this.rawMarkup = this.rawMarkup.bind(this);
	}

	rawMarkup() {
		let rawMarkup = marked(this.props.content, {sanitize: true});
		return { __html: rawMarkup };
	}

	render(){
		return (
			<div>
				<article>
					<header>
						<h2>{this.props.title}</h2>
					</header>
					<section>
						<div style={style} dangerouslySetInnerHTML={this.rawMarkup()}></div>
					</section>
				</article>
			</div>
		);
	}
};
