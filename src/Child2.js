import React from 'react'
import './Child2.css'

import P5Wrapper from 'react-p5-wrapper';


class Child2 extends React.Component {
    constructor(props) {
        super();
        this.state = { };
    }

    render() {
        return (
          <div></div>
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
