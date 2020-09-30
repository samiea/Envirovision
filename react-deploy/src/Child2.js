import React from 'react'
import './Child2.css'

import P5Wrapper from 'react-p5-wrapper';
import wave from './sketches/wave';
import sketch from './sketches/sketch';

class Child2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
          <P5Wrapper sketch={sketch} ></P5Wrapper>
        );
    }

    componentDidMount() {
        console.log("Child2 Mounted");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Child2 Updated");
    }
}

export default Child2
