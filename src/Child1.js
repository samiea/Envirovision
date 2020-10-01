import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sun from './sketches/sun';
import sound from './sketches/sound';

class Child1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("Child1 Mounted");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Child1 Updated");
        //console.log(this.props.carbonData); // access data from props; prints data after re-render
        // recall that setting the state forced re-render, causing componentDidUpdate() to be called by children
    }

    render() {
        return (
            <div>
                <P5Wrapper sketch={sun} carbArray={this.props.carbonData}></P5Wrapper>
                <P5Wrapper sound={sound}></P5Wrapper>
            </div>
        );
    }
}

export default Child1
