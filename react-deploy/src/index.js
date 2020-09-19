import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
function Air() {
  const [info, setCarbonDioxide] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(
      'https://global-warming.org/api/co2-api'
    );

    setCarbonDioxide(response.data);
  };
  return (
      <div className="App">
        <h1>Air Quality</h1>
        <h2>Fetch a list from an API and display it</h2>

        /* Fetch data from API */
        <div>
          <button className="fetch-button" onClick={fetchData}>
            Fetch Data
          </button>
          <br />
        </div>

      </div>
  );
}

//function setCarbonDioxide(value: any ){}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

//start application
const rootElement = document.getElementById('root');
ReactDOM.render(<Air />, rootElement);
//serviceWorker.unregister();
