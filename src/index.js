import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketches/sketch';

<<<<<<< 67251c04ba6f415c187ddce864f0630e8dc30bea
// there is probably a way better way to do this, but new urls are added to end of the urls csv string
ReactDOM.render(
    <React.StrictMode>
        <App
            urls={"https://global-warming.org/api/co2-api,https://global-warming.org/api/methane-api,https://global-warming.org/api/nitrous-oxide-api,https://global-warming.org/api/temperature-api"}
        />
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
=======

var startCarbonDioxide=function(carbonArray){
  console.log(carbonArray.co2[100]);
  console.log(carbonArray.co2.length)
  return carbonArray

}
var startMethane=function(methArray){
  console.log(methArray.methane[100]);
  console.log(methArray.methane.length)
  return methArray

}
var startNitrous=function(nitArray){
  console.log(nitArray.nitrous[100]);
  console.log(nitArray.nitrous.length)
  return nitArray

}

function Enviorment() {

  //const  [carbonDioxide, setCarbonDioxide] = useState(null);

  const fetchData = async () => {

    function getApibyUrl(url, dataFunction){

      const proxyurl = "https://cors-anywhere.herokuapp.com/";

      var response = axios.get(
        proxyurl+url
      ).then(function(response){
          console.log(response.data)
          return dataFunction(response.data)
      }).catch(err => {
          // what now?
        console.log(err);
      });

    }
    //Air
    var url = 'https://global-warming.org/api/co2-api'
    const carbonData = getApibyUrl(url,startCarbonDioxide)
    //console.log(carbonData);

    url = 'https://global-warming.org/api/methane-api'
    var responseData =  getApibyUrl(url,startMethane)
    //console.log(responseData.result);

    url = 'https://global-warming.org/api/nitrous-oxide-api'
    responseData = getApibyUrl(url,startNitrous)
    //console.log(responseData.result);
    //surface temperature
    url = 'https://global-warming.org/api/temperature-api'
    //responseData = getApibyUrl(url.result)
    //arctic ice
    url = 'https://global-warming.org/api/arctic-api'
    //responseData = getApibyUrl(url result)
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
          <P5Wrapper sketch={sketch}></P5Wrapper>

          <br />
        </div>

      </div>
  );
}

//start application

const rootElement = document.getElementById('root');

ReactDOM.render(<Enviorment />, rootElement);
>>>>>>> Changing contents to previous
