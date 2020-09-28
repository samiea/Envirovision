import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketches/sketch';

let loaded = false;
let carbData = [];
let metData = [];
let iceData = [];
let nitrData = [];
let tempData = [];

const pullData = async () => {

  function getApibyUrl(url, dataArray){

    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    var response = axios.get(
      proxyurl+url
    ).then(function(response){
        //console.log(response.data)
        dataArray = response.data;
        console.log("dataArray: ");
        console.log(dataArray);
        return dataArray;
    }).catch(err => {
        // what now?
      console.log(err);
    });

  }

  //Air
  var url = 'https://global-warming.org/api/co2-api'
  getApibyUrl(url, carbData);

  url = 'https://global-warming.org/api/methane-api'

  url = 'https://global-warming.org/api/nitrous-oxide-api'

  //surface temperature
  url = 'https://global-warming.org/api/temperature-api'

  //arctic ice
  url = 'https://global-warming.org/api/arctic-api'
};

function Environment() {

  return (
      <div className="App">
        <h1>Air Quality</h1>
        <h2>Fetch a list from an API and display it</h2>

        /* Fetch data from API */
        <div>
          <button className="fetch-button" onClick={pullData}>
            Pull Data
          </button>
          
          <P5Wrapper sketch={sketch} carbon={carbData}></P5Wrapper>

          <br />
        </div>

      </div>
  );
}

//start application

const rootElement = document.getElementById('root');

pullData().then(function(response){
    loaded = true;
    console.log("data loaded");
    ReactDOM.render(<Environment />, rootElement);
  }
);

//ReactDOM.render(<Environment />, rootElement);
