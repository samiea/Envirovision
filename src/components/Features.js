import React, { Component } from "react";
import WindowPortal from "./WindowPortal";
import App from '../App.js';

class Features extends Component {
	constructor(props) {
		super();

		this.state = {
			counter: 0,
			showWindowPortal: false,
        };
        

		this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
		this.closeWindowPortal = this.closeWindowPortal.bind(this);
	}

	componentDidMount() {
		window.addEventListener("beforeunload", () => {
			this.closeWindowPortal();
		});

		window.setInterval(() => {
			this.setState((state) => ({
				counter: state.counter + 1,
			}));
		}, 1000);
	}

	toggleWindowPortal() {
		this.setState((state) => ({
			...state,
			showWindowPortal: !state.showWindowPortal,
		}));
	}

	closeWindowPortal() {
		this.setState({ showWindowPortal: false });
	}

	render() {
		return (
			<section id="four" className="wrapper alt style1">
				<div className="inner">
					<h2 className="major">Vitae phasellus</h2>
					<p>
						Cras mattis ante fermentum, malesuada neque vitae,
						eleifend erat. Phasellus non pulvinar erat. Fusce
						tincidunt, nisl eget mattis egestas, purus ipsum
						consequat orci, sit amet lobortis lorem lacus in tellus.
						Sed ac elementum arcu. Quisque placerat auctor laoreet.
					</p>
					<section className="features">
						<article>
							<a
								href="#index"
								onClick={this.toggleWindowPortal}
								className="image"
							>
								<img
									src={`${process.env.PUBLIC_URL}/images/pic04.jpg`}
									alt=""
								/>
							</a>
							<h3 className="major">Sed feugiat lorem</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing vehicula id nulla dignissim dapibus
								ultrices.
							</p>
							<a href="index.html" className="special">
								Learn more
							</a>
						</article>
						{this.state.showWindowPortal && (
							<WindowPortal
								closeWindowPortal={this.closeWindowPortal}
							>
                                        <App
            // urls={"https://global-warming.org/api/co2-api,https://global-warming.org/api/methane-api,https://global-warming.org/api/nitrous-oxide-api,https://global-warming.org/api/temperature-api"}
        />
							</WindowPortal>
						)}
						<article>
							<a href="index.html" className="image">
								<img
									src={`${process.env.PUBLIC_URL}/images/pic05.jpg`}
									alt=""
								/>
							</a>
							<h3 className="major">Nisl placerat</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing vehicula id nulla dignissim dapibus
								ultrices.
							</p>
							<a href="index.html" className="special">
								Learn more
							</a>
						</article>
						<article>
							<a href="index.html" className="image">
								<img
									src={`${process.env.PUBLIC_URL}/images/pic06.jpg`}
									alt=""
								/>
							</a>
							<h3 className="major">Ante fermentum</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing vehicula id nulla dignissim dapibus
								ultrices.
							</p>
							<a href="index.html" className="special">
								Learn more
							</a>
						</article>
						<article>
							<a href="index.html" className="image">
								<img
									src={`${process.env.PUBLIC_URL}/images/pic07.jpg`}
									alt=""
								/>
							</a>
							<h3 className="major">Fusce consequat</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing vehicula id nulla dignissim dapibus
								ultrices.
							</p>
							<a href="index.html" className="special">
								Learn more
							</a>
						</article>
					</section>
					<ul className="actions">
						<li>
							<a href="index.html" className="button">
								Browse All
							</a>
						</li>
					</ul>
				</div>
			</section>
		);
	}
}

export default Features;
