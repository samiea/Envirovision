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


function Enviorment() {

  function getApibyUrl(url){

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const response = axios.get(
      proxyurl+url
    ).then(function(response){
        console.log(response.data)
        //setCarbonDioxide(response.data);
    }).catch(err => {
        // what now?
      console.log(err);
    });
  }
  const  setCarbonDioxide = useState(null);

  const fetchData = async () => {
    //Air
    var url = 'https://global-warming.org/api/co2-api'
    getApibyUrl(url)
    url = 'https://global-warming.org/api/methane-api'
    getApibyUrl(url)
    url = 'https://global-warming.org/api/nitrous-oxide-api'
    getApibyUrl(url)
    //surface temperature
    url = 'https://global-warming.org/api/temperature-api'
    getApibyUrl(url)
    //arctic ice
    url = 'https://global-warming.org/api/arctic-api'
    getApibyUrl(url)
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
//var express = require('express');
// Import the library:
//var cors = require('cors');

//var app = express();

// Then use it before your routes are set up:
//app.use(cors());
//start application
const rootElement = document.getElementById('root');
ReactDOM.render(<Enviorment />, rootElement);
//serviceWorker.unregister();
