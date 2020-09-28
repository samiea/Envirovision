import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function GlobalWarmingData() {
    // state hooks; reference: https://reactjs.org/docs/hooks-effect.html
    const [count, setCount] = useState(0);
    const [carbonData, setCarbonData] = useState({})
    const [methaneData, setMethaneData] = useState({})
    const [nitrousData, setNitrousData] = useState({})
    const [temperatureData, setTemperatureData] = useState({})

    // reference: https://www.robinwieruch.de/react-hooks-fetch-data
    useEffect(() => {
        const fetchData = async () => {
            let urls = [
                "https://global-warming.org/api/co2-api/",
                "https://global-warming.org/api/methane-api",
                "https://global-warming.org/api/nitrous-oxide-api",
                "https://global-warming.org/api/temperature-api",
            ]
            const proxyurl = "https://cors-anywhere.herokuapp.com/";

            let promises = [];
            urls.forEach(function(url) {
                promises.push(axios(proxyurl + url))
            })

            // order of promises is retained; reference: https://stackoverflow.com/questions/28066429/promise-all-order-of-resolved-values/28066851
            const data = await Promise.all(promises);
            setCarbonData(data[0]);
            setMethaneData(data[1]);
            setNitrousData(data[2]);
            setTemperatureData(data[3]);

            console.log(carbonData);
            console.log(methaneData);
            console.log(nitrousData);
            console.log(temperatureData);
        };
  
      fetchData();
    }, []); // Or [] if effect doesn't need props or state

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

const rootElement = document.getElementById('root');

ReactDOM.render(<GlobalWarmingData />, rootElement);
