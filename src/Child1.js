import React from 'react'
import './Child1.css'
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketches/sketch';

class Child1 extends React.Component {
    constructor(props) {
        super();

    }

    render() {
      console.log(this.props);
        return (
            <P5Wrapper
                sketch={sketch}
                temperatureData={this.props.temperatureData}
                currentDate={this.props.currentDate}>
                microGrowth2050 ={this.props.microGrowth2050}
            </P5Wrapper>
            //<P5Wrapper sketch={wave}></P5Wrapper>
        );
    }

    componentDidMount() {
        console.log("Child1 Mounted");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Child1 Updated");
        console.log(prevProps);

    }


}

export default Child1
