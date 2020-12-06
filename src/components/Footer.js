import React, { Component } from "react";

class Footer extends Component {
	render() {
		return (
			<section id="footer">
				<div className="inner">
                    <h2 className="major">Meet The Artists</h2>
                    <p>
                        Got questions or comments? Contact us! We are Computer Science students at Virginia Tech studying creative computing with an aim to make positive impacts on the world
                    </p>
                    <div class="row">
                        <div class="col-6 col-12-medium">
                            <p>
                                <b>Rachel Hachem:</b> Data Sonification, Digital Media
                                <ul className="contact">
                                    <li className="icon solid fa-envelope">
                                        <a href="mailto:rachelly@vt.edu">rachelly@vt.edu</a>
                                    </li>
                                </ul>
                            </p>
                            <p>
                                <b>Quinn Eggleston:</b> Data Visualization, Library
                                Management
                                <ul className="contact">
                                    <li className="icon solid fa-envelope">
                                        <a href="mailto:qdeggles@vt.edu">qdeggles@vt.edu</a>
                                    </li>
                                </ul>
                            </p>
                        </div>
                        <div class="col-6 col-12-medium">
                            <p>
                                <b>Samie Amriui:</b> Data Visualization, Website Content
                                <ul className="contact">
                                    <li className="icon solid fa-envelope">
                                        <a href="mailto:samriui@outlook.com">samriui@outlook.com</a>
                                    </li>
                                </ul>
                            </p>
                            <p>
                                <b>Tim Kueny:</b> Data Visualization, Data Processing
                                <ul className="contact">
                                    <li className="icon solid fa-envelope">
                                        <a href="mailto:kuenytc5@vt.edu">kuenytc5@vt.edu</a>
                                    </li>
                                </ul>
                            </p>
                        </div>
                    </div>
				</div>
			</section>
		);
	}
}

export default Footer;
