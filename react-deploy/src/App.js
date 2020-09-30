import React from 'react';
import './App.css';
import Child1 from './Child1' // import both children
import Child2 from './Child2'
import Child3 from './Child3'
import axios from 'axios'; // used for API stuff


class App extends React.Component {
    // you can create class-scope fields in here like in Java
    constructor(props) {
        super(props)
        this.handleQuarterChange = this.handleQuarterChange.bind(this); // notice that functions need to be binded
        this.handleCountyChange = this.handleCountyChange.bind(this);
        this.state = { // you can add new states here
            carbonData: null,
            methaneData: null,
            nitrousData: null,
            temperatureData: null,
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
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) { // when re-render occurs, componentDidUpdate() is called
        console.log("Parent Updated");
    }

    render() {
        console.log(this);
        return (
            <div className="App">
                <Child1
                    tempData={this.state.temperatureData} // need to pass data into children via props
                />
                <Child2
                />
                <Child3/>
            </div>
        );
    }
}

export default App;
