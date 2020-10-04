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
        super(props);
        this.createSlider = this.createSlider.bind(this);
        this.state = { // you can add new states here
            // initialize below states to null if not using static data for testing
            carbonData: carbonJSON.co2,
            methaneData: methaneJSON.methane,
            nitrousData: nitrousJSON.nitrous,
            temperatureData: temperatureJSON.result,
            currentDate: new Date(), // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
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

    createSlider() {
        const self = this;

        let formatDateIntoYear = d3.timeFormat("%Y");
        let formatDate = d3.timeFormat("%B %d, %Y");
        // https://github.com/d3/d3-time-format

        let startDate = new Date("2004-11-01");
        let endDate = new Date("2017-04-01");

        let margin = {top:50, right:50, bottom:0, left:50};
        let width = 960 - margin.left - margin.right;
        let height = 500 - margin.top - margin.bottom;

        let timer = 0;
        let currentValue = 0;
        let targetValue = width;

        let playButton = d3.select("#play-button"); // select play button

        playButton
            .on("click", function() {
                let button = d3.select(this); // recall 'this' references the d3 selection
                if (button.text() === "Pause") {
                    clearInterval(timer); // if pause, clear interval
                    button.text("Play"); // change text to play
                } else {
                    timer = setInterval(function() { // play interval asynchronously
                        update(x.invert(currentValue)); // update handle position
                        currentValue = currentValue + (targetValue / 151); // update/adjust current value tick jups
                        if (currentValue > targetValue) { // if at end of range
                            // currentValue = 0;
                            clearInterval(timer); // clear interval so that it can restart
                            playButton.text("Play"); // at end of interval, change text to play
                        }
                        self.setState({ currentDate: x.invert(currentValue) }); // communicate with child
                    }, 100); // loops for about 20 seconds going from month to month
                    button.text("Pause"); // change text to pause
                }
            })


        let svg = d3.select(".App") // appends svg on top of .App svg
            .append("svg") // add new svg on top of exterior svg
            .attr("width", width + margin.left + margin.right) // set width of svg
            .attr("height", height + margin.top + margin.bottom); // set height of svg

        let slider = svg.append("g") // create the slider
            .attr("class", "slider") // apply slider css properties
            .attr("transform", "translate(" + margin.left + "," + height / 5 + ")"); // shift from left and make it higher

        let x = d3.scaleTime() // https://observablehq.com/@d3/d3-scaletime
            .domain([startDate, endDate]) // use timescale domain between start and end dates
            .range([0, targetValue]) // define range of slider being from beginning to end of its range
            .clamp(true); // ensure that handle does not escape range

        slider.append("line")
            .attr("class", "track") // apply track css properties
            .attr("x1", x.range()[0])
            .attr("x2", x.range()[1])
            .select(function() {
                return this.parentNode.appendChild(this.cloneNode(true));
            })
            .attr("class", "track-inset") // apply track-inset cs properties
            .select(function() {
                return this.parentNode.appendChild(this.cloneNode(true));
            })
            .attr("class", "track-overlay") // apply track-overlay css properties
            .call(d3.drag() // dragging behavior
                .on("start.interrupt", function() { // on any interrupts
                    slider.interrupt();
                })
                .on("start drag", function(event) { // while hande is dragged
                    currentValue = event.x; // store current value
                    update(x.invert(currentValue)); // update handle location
                })
                .on("end", function(event) { // when handle is released
                    self.setState({ currentDate: x.invert(currentValue) });
                })
            );

        let handle = slider.insert("circle", ".track-overlay") // inserts the track
            .attr("class", "handle") // apply .handle css properties
            .attr("r", 9); // radius of handle

        let label = slider.append("text") // append text onto slider
            .attr("class", "label") // apply label css properties
            .attr("text-anchor", "middle") // anchor text to middle
            .text(formatDate(startDate)) // display currently selected date
            .attr("transform", "translate(0," + (-25) + ")") // shift it to the right

        document.addEventListener('keydown', function(event) { // listen for keypresses
            switch (event.key) { // we are only concerned about left/right arrow keys
                case "ArrowLeft":
                    currentValue = // ensure handle does not decrement below zero
                        (currentValue === 0) ? currentValue : currentValue - 1;
                    update(x.invert(currentValue)); // shift handle one to left
                    break;
                case "ArrowRight":
                    currentValue++; // increment current value
                    update(x.invert(currentValue)); // shift handle one to right
                    break;
                default:
                    break;
            }
        });

        slider.insert("g", ".track-overlay") // create the track overlay
            .attr("class", "ticks") // apply ticks css properties
            .attr("transform", "translate(0," + 18 + ")") // shift it to right
            .selectAll("text") // apply following changes to all text on slider (ticks)
            .data(x.ticks(10)) // https://observablehq.com/@d3/d3-scaletime
            .enter() // https://observablehq.com/@dnarvaez27/understanding-enter-exit-merge-key-function
            .append("text") // append text representing ticks
            .attr("x", x) // initialize x position
            .attr("y", 10) // initialize y position
            .attr("text-anchor", "middle") // center text on tick
            .text((d) => formatDateIntoYear(d)); // write formatted date as text

        function update(h) {
            // update position and text of label according to slider scale
            handle.attr("cx", x(h)); // update handle position
            label
                .attr("x", x(h)) // update tick label position
                .text(formatDate(h)); // update tick label with new date
        }
    }

    componentDidMount() { // this is called when the page is initially loaded/mounted
        console.log("Parent Mounted");
        // this.loadData(); // comment this out if using static files; loadData() will make API requests
        this.createSlider();
    }

    componentDidUpdate(prevProps, prevState, snapshot) { // when re-render occurs, componentDidUpdate() is called
        console.log("Parent Updated");

    }

    render() {
        return (
            <div id="App" className="App">
                <Child1
                    currentDate={this.state.currentDate}
                    tempArray={this.state.temperatureData} // need to pass data into children via props
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
