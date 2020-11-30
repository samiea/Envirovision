import React, { Component } from "react";

class Contents extends Component {
	render() {
		return (
			<section id="wrapper">
				<section id="one" className="wrapper spotlight style1">
					<div className="inner">
                        <img className="image" src={`${process.env.PUBLIC_URL}/images/pic01.jpg`} alt="" />
						<div className="content">
							<h2 className="major">[artist statement]</h2>
							<p>
								[project goals]
							</p>
						</div>
					</div>
				</section>

				<section id="two" className="wrapper alt spotlight style2">
					<div className="inner">
						<a href="index.html" className="image">
							<img src={`${process.env.PUBLIC_URL}/images/pic02.jpg`} alt="" />
						</a>
						<div className="content">
							<h2 className="major">[instructions]</h2>
							<p>
								[how to use; might replace legend with this]
							</p>
							<a href onClick={scrollToBottom} className="special">
								[scrolls to bottom of page]
							</a>
						</div>
					</div>
				</section>

				{/* <section id="three" className="wrapper spotlight style3">
					<div className="inner">
						<a href="index.html" className="image">
							<img src={`${process.env.PUBLIC_URL}/images/pic03.jpg`} alt="" />
						</a>
						<div className="content">
							<h2 className="major">Nullam dignissim</h2>
							<p>
								Lorem ipsum dolor sit amet, etiam lorem
								adipiscing elit. Cras turpis ante, nullam sit
								amet turpis non, sollicitudin posuere urna.
								Mauris id tellus arcu. Nunc vehicula id nulla
								dignissim dapibus. Nullam ultrices, neque et
								faucibus viverra, ex nulla cursus.
							</p>
							<a href="index.html" className="special">
								Learn more
							</a>
						</div>
					</div>
				</section> */}
			</section>
		);
	}
}

function scrollToBottom() {
    document.getElementById('p5-canvas').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

export default Contents;
