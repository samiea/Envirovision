import React from 'react'
import './Child1.css'
import P5Wrapper from 'react-p5-wrapper';
import sun from './sketches/sun';
import co2Length from './sketches/sun'


class Child1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          carbonData: null,
        };
    }

    render() {
      //console.log(this.state);
        return (
          <P5Wrapper sketch={sun} co2Array = {this.props}></P5Wrapper>
        );
    }

    componentDidMount() {
        console.log("Child1 Mounted");


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Child1 Updated");
        //console.log("didUpdate");

        //console.log(this); // access data from props; prints data after re-render
        //this.state=this.props// recall that setting the state forced re-render, causing componentDidUpdate() to be called by children

    }

}

export default Child1
