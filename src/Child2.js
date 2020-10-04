import React from "react";
import ReactDOM from "react-dom";
import { Sampler } from "tone";
import A1 from "./sounds/oriMainTheme.m4a"
import "./Child2.css";

class Child2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoaded: false };
        this.handleClick = this.handleClick.bind(this);

        this.sampler = new Sampler(
            { A1 },
            {
                onload: () => {
                    this.setState({ isLoaded: true });
                }
            }
        ).toMaster();
    }

    handleClick() {
        this.sampler.triggerAttack("A1");
    }

    render() {
        const { isLoaded } = this.state;

        return (
            <div className="Child2" >
                <button disabled={!isLoaded} onClick={this.handleClick}>
                    start
                </button>
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
