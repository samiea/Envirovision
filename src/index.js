import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketches/sketch';


var startCarbonDioxide=function(carbonArray){
  return carbonArray;
}

var startMethane=function(methArray){
  return methArray;
}

var startNitrous=function(nitArray){
  return nitArray;
}

var startTemp=function(temperatureArray){
  return temperatureArray;
}

var startArc=function(arcArray){
  return arcArray;
}

let loaded = false;
let carbData = [];
let metData = [];
let iceData = [];
let nitrData = [];
let tempData = [];

const pullData = async () => {

  function getApibyUrl(url, dataFunction){

    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    var response = axios.get(
      proxyurl+url
    ).then(function(response){
        //console.log(response.data)
        return dataFunction(response.data)
    }).catch(err => {
        // what now?
      console.log(err);
    });

  }

  //Air
  var url = 'https://global-warming.org/api/co2-api'
  carbData = getApibyUrl(url,startCarbonDioxide).then(function(response) {
    console.log("After loading: ");
    console.log(carbData);
  });

  url = 'https://global-warming.org/api/methane-api'
  metData =  getApibyUrl(url,startMethane)

  url = 'https://global-warming.org/api/nitrous-oxide-api'
  nitrData = getApibyUrl(url,startNitrous)

  //surface temperature
  url = 'https://global-warming.org/api/temperature-api'
  tempData = getApibyUrl(url, startTemp)

  //arctic ice
  url = 'https://global-warming.org/api/arctic-api'
  iceData = getApibyUrl(url, startArc)
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
