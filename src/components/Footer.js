import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<section id="footer">
				<div className="inner">
					<h2 className="major">[meet the artists]</h2>
					<p>
						[description of team with four circles (like ones above but a bit smaller) below this text block for our photos with photo captions that detail our names, emails, roles, skills, and whatever else that seems suitable]
					</p>
					<ul className="contact">
						<li className="icon solid fa-envelope">
							<a href="#index">information@untitled.tld</a>
						</li>
					</ul>
					<ul className="copyright">
						<li>&copy; Team Winter Is COMING. All rights reserved.</li>
						<li>
							Design: <a href="http://html5up.net">HTML5 UP</a>
						</li>
					</ul>
				</div>
			</section>
		);
	}
}

export default Footer;
