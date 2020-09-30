import React from 'react'
import './Child3.css'

import P5Wrapper from 'react-p5-wrapper';
import molecules from './sketches/molecules';

class Child3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
          <P5Wrapper sketch={molecules} ></P5Wrapper>
        );
    }

    componentDidMount() {
        console.log("Child3 Mounted");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Child3 Updated");
    }
}

export default Child3
