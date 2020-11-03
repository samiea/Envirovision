import React from 'react'
import './Child1.css'
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketches/sketch';

class Child1 extends React.Component {
    constructor(props) {
        super();
        this.methaneMap = new Map();
    }

    render() {
      //console.log(this.props);
        return (
            <P5Wrapper
                sketch={sketch}
                temperatureData={this.props.temperatureData}
                currentDate={this.props.currentDate}
                microGrowth2050={this.props.microGrowth2050}
                macroGrowth2050={this.props.macroGrowth2050}
                carbonData={this.props.carbonData}
                methaneData={{"map": this.methaneMap, "arr": this.props.methaneData}}>
            </P5Wrapper>
            //<P5Wrapper sketch={wave}></P5Wrapper>
        );
    }

    componentDidMount() {
        if (this.props.methaneData) {
            this.props.methaneData.forEach(e => { // look over methane data
                let yyyy = e.date.substring(0, 4);
                let mm = e.date.substring(5, e.date.length).padStart(2, '0');
                let dd = "01"
    
                let date = `${yyyy}-${mm}-${dd}`;
                this.methaneMap.set(date, e.average); // map date to average
            });
        }
        else {
            console.error(`Methane data ${this.props.methaneData}`);
        }
        // console.log("Child Mounted");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log("New date: " + this.props.currentDate);
    }
}

export default Child1
