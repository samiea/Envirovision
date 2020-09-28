import React from 'react'
import './Child1.css'

class Child1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="Child1">
            </div>
        );
    }

    componentDidMount() {
        console.log("Child1 Mounted");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Child1 Updated");
        console.log(this.props.carbonData); // access data from props; prints data after re-render
        // recall that setting the state forced re-render, causing componentDidUpdate() to be called by children
    }
}

export default Child1
