import React from 'react'
import './Child2.css'

class Child2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <div className="Child2" >
            </div>
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
