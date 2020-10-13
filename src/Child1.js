import React from 'react'
import './Child1.css'
import P5Wrapper from 'react-p5-wrapper';
import landscape from './sketches/landscape';

class Child1 extends React.Component {
    constructor(props) {
        super();
        this.state = {
            carbonData: null,
        };
    }

    render() {
        return ( // props on p5 wrapper are redundant, just for demonstration purposes
            <P5Wrapper 
                sketch={landscape}
                temperatureData={this.props.temperatureData}
                currentDate={this.props.currentDate}>
            </P5Wrapper>
            //<P5Wrapper sketch={wave}></P5Wrapper>
        );
    }

    componentDidMount() {
        console.log("Child1 Mounted");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Child1 Updated");
        // console.log(prevProps);

    }


}

export default Child1
