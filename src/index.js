import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import Header from './components/Header';
import Contents from "./components/Contents";
import Features from './components/Features';
import Footer from './components/Footer';



// there is probably a way better way to do this, but new urls are added to end of the urls csv string
ReactDOM.render(
    <React.StrictMode>
        <div id="page-wrapper">
            <Header />
            <Contents />
            <Features />
            <Footer />
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
