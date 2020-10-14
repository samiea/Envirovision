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
// end testing-related import block

class App extends React.Component {
    // you can create class-scope fields in here like in Java
    constructor(props) {
        super(props)
        this.handleQuarterChange = this.handleQuarterChange.bind(this); // notice that functions need to be binded
        this.handleCountyChange = this.handleCountyChange.bind(this);
        this.state = { // you can add new states here
            // initialize below states to null if not using static data for testing
            carbonData: carbonJSON.co2,
            methaneData: methaneJSON.methane,
            nitrousData: nitrousJSON.nitrous,
            temperatureData: temperatureJSON.result,
            dataIsLoaded: false
        };
    }

    handleQuarterChange(value) {
        this.setState({ quarter: value });
    }

    handleCountyChange(value) {
        this.setState({ county: value });
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
        console.log("Parent Mounted");
        // this.loadData(); // comment this out if using static files; loadData() will make requests
    }

    componentDidUpdate(prevProps, prevState, snapshot) { // when re-render occurs, componentDidUpdate() is called
        console.log("Parent Updated");
    }

    render() {
        return (
            <div className="App">
                <Child2
                    carbonData={this.state.carbonData}
                />
            </div>
        );
    }
}

export default App;
