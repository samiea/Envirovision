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
						<div className="content">
							<h2 className="major">Usage instructions</h2>
							<p>
								Interact with moving objects on the visualization to display value representation of pollutants corresponding with the current period in time.
                                <br />
                                <br />
                                <b>Sky Color:</b> The color of the sky is based off carbon dioxide data, darkening as CO2 levels in the atmosphere increase.
                                <br />
                                <b>Ocean Color:</b> The color of the ocean is based off ocean pollution data, darkening as levels in the ocean increase.
                                <br />
                                <b>Sun Size:</b> The sun increases and decreases in size based on global temperature averages - larger means hotter, smaller means cooler.
                                <br />
                                <b>Smog:</b> The grey smog clouds increase and decrease in density, size, and number based off of nitrous oxide levels in the atmosphere.
                                <br />
                                <b>Ocean Level:</b> The sea level rises or descends based off sea level data
                                <br />
                                <b>Microplastics:</b> The small white dots drifting downward through the ocean represent microplastics, tiny plastic particulates polluting the oceans. They increase and decrease in number based on microplastic levels in the oceans.
                                <br />
                                <b>Macroplastics:</b> The large brown and grey shapes on the ocean surface represent macroplastics, larger plastic objects polluting the oceans. They increase and decrease in number based on macroplastic levels in the oceans.
                                <br />
                                <b>Bubbles:</b> The bubbles rising up through the ocean represent methane entering the atmosphere, and increase and decrease in number accordingly.
							</p>
							<a href onClick={scrollToBottom} className="special">
								Click to view visualization
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
