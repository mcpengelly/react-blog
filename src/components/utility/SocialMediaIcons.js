import React from 'react';
//load icons
import FaGithub from 'react-icons/lib/fa/github';
import FaLinkedIn from 'react-icons/lib/fa/linkedin';
import FaTwitter from 'react-icons/lib/fa/twitter'

import A from './A';

const SocialMediaIcons = () => {
	return (
		<div className="social-media-icons" style={{ display: 'inline-block' }}>
			<A linkTo="https://github.com/mcpengelly"><FaGithub /></A>
			<A linkTo="https://www.linkedin.com/in/matt-pengelly-575ba886"><FaLinkedIn /></A>
			<A linkTo="https://twitter.com/typycyl"><FaTwitter /></A>
		</div>
	);
}

export default SocialMediaIcons;