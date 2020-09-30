import React from 'react';
import './App.css';
import Child1 from './Child1' // import both children
import Child2 from './Child2'
import axios from 'axios'; // used for API stuff

// below imports are for static files to avoid 429 errors from requests while testing
import carbonJSON from './static/carbon.json'
import methaneJSON from './static/methane.json'
import nitrousJSON from './static/nitrous.json'
import temperatureJSON from './static/temperature.json'

import * as d3 from 'd3';
// import {sliderBottom} from 'd3-simple-slider';
// end testing-related import block

class App extends React.Component {
    // you can create class-scope fields in here like in Java
    constructor(props) {
        super(props)
        this.state = { // you can add new states here
            // initialize below states to null if not using static data for testing
            carbonData: carbonJSON.co2,
            methaneData: methaneJSON.methane,
            nitrousData: nitrousJSON.nitrous,
            temperatureData: temperatureJSON.result,
            currentDate: new Date(),
            dataIsLoaded: false
        };
    }

    loadData() {
        const fetchData = async () => {
            const proxyurl = "https://cors-anywhere.herokuapp.com/"; // proxy url that is used in combination with real url
            
            let promises = []; // make an array of promises
            this.props.urls.split(",").forEach(function(url) {
                promises.push(axios(proxyurl + url)); // push request onto promise array
            })
            
            // order of promises is retained; reference: https://stackoverflow.com/questions/28066429/promise-all-order-of-resolved-values/28066851
            const data = await Promise.all(promises);

            this.state.carbonData = data[0].data.co2; // directly modifying the state like this does NOT force re-render
            this.state.methaneData = data[1].data.methane;
            this.state.nitrousData = data[2].data.nitrous;
            this.state.temperatureData = data[3].data.result;

            this.setState({ dataIsLoaded: true }); // calling this.setState(...) forces re-render
        };
        fetchData();
    }

    componentDidMount() { // this is called when the page is initially loaded/mounted
        const self = this;

        let formatDateIntoYear = d3.timeFormat("%Y");
        let formatDate = d3.timeFormat("%B %d, %Y");
        
        let startDate = new Date("2004-11-01");
        let endDate = new Date("2017-04-01");
        
        let margin = {top:50, right:50, bottom:0, left:50};
        let width = 960 - margin.left - margin.right;
        let height = 500 - margin.top - margin.bottom;

        let timer = 0;
        let currentValue = 0;
        let targetValue = width;

        let playButton = d3.select("#play-button");

        playButton
            .on("click", function() {
            let button = d3.select(this);
            if (button.text() === "Pause") {
                clearInterval(timer);
                button.text("Play");
            } else {
                timer = setInterval(function() {
                    update(x.invert(currentValue));
                    currentValue = currentValue + (targetValue/151);
                    if (currentValue > targetValue) {
                        currentValue = 0;
                        clearInterval(timer);
                        playButton.text("Play");
                    }
                    self.setState({ currentDate: x.invert(currentValue) });
                }, 100);
                button.text("Pause");
            }
        })
        

        let svg = d3.select(".App") // set id="..." prop render and select using #...
            .append("svg") // add new svg on top of exterior svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        let slider = svg.append("g")
            .attr("class", "slider")
            .attr("transform", "translate(" + margin.left + "," + height / 5 + ")");

        let x = d3.scaleTime()
            .domain([startDate, endDate])
            .range([0, targetValue])
            .clamp(true);

        function update(h) {
            // update position and text of label according to slider scale
            handle.attr("cx", x(h));
            label
                .attr("x", x(h))
                .text(formatDate(h));
        }

        slider.append("line")
            .attr("class", "track")
            .attr("x1", x.range()[0])
            .attr("x2", x.range()[1])
            .select(function() {
                return this.parentNode.appendChild(this.cloneNode(true));
            })
            .attr("class", "track-inset")
            .select(function() {
                return this.parentNode.appendChild(this.cloneNode(true));
            })
            .attr("class", "track-overlay")
            .call(d3.drag()
                .on("start.interrupt", function() {
                    slider.interrupt();
                })
                .on("start drag", function(event) {
                    currentValue = event.x;
                    update(x.invert(currentValue)); 
                })
                .on("end", function(event) {
                    self.setState({ currentDate: x.invert(currentValue) });
                })
            );

        document.addEventListener('keydown', function(event) {
            switch (event.key) {
                case "ArrowLeft":
                    currentValue = currentValue === 0 ? currentValue : currentValue - 1;
                    update(x.invert(currentValue)); 
                    break;
                case "ArrowRight":
                    currentValue++;
                    update(x.invert(currentValue));
                    break;
                default:
                    break;
            }
        });
    

        slider.insert("g", ".track-overlay")
            .attr("class", "ticks")
            .attr("transform", "translate(0," + 18 + ")")
            .selectAll("text")
            .data(x.ticks(10))
            .enter()
            .append("text")
            .attr("x", x)
            .attr("y", 10)
            .attr("text-anchor", "middle")
            .text((d) => formatDateIntoYear(d));

        let handle = slider.insert("circle", ".track-overlay")
            .attr("class", "handle")
            .attr("r", 9);

        let label = slider.append("text")  
            .attr("class", "label")
            .attr("text-anchor", "middle")
            .text(formatDate(startDate))
            .attr("transform", "translate(0," + (-25) + ")")

        console.log("Parent Mounted");
        // this.loadData(); // comment this out if using static files; loadData() will make requests
    }

    componentDidUpdate(prevProps, prevState, snapshot) { // when re-render occurs, componentDidUpdate() is called
        console.log("Parent Updated");
        console.log(this.state.currentDate);
    }

    render() {
        return (
            <div id="App" className="App">
                <Child1
                    currentDate={this.state.currentDate}
                    carbonData={this.state.carbonData} // need to pass data into children via props
                />
                <Child2
                    currentDate={this.state.currentDate}
                />
                <button id="play-button">Play</button>
            </div>
        );
    }
}

export default App;
