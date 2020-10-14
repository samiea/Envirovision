import React from "react";
//import ReactDOM from "react-dom";
import * as Tone from "tone";
import ori from "./sounds/oriMainTheme.m4a"
import "./Child2.css";

class Child2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoaded: false,
            isDistorted: false
        };
        this.clickStart = this.clickStart.bind(this);
        this.clickDistort = this.clickDistort.bind(this);
        this.clickNoDistort = this.clickNoDistort.bind(this);

        this.buffer = new Tone.ToneAudioBuffer(ori, () => {
            console.log("Loading successful!");
        }, () => {
            console.log("ERROR LOADING SOUND!");
        });

        this.dist = new Tone.Distortion(0).toDestination();

        this.player = new Tone.Player(this.buffer, () => {
            console.log("Player ready!");
            this.setState({ isLoaded: true });
        }).connect(this.dist).toMaster();
    }

    clickStart() {
        Tone.start();
        this.player.start(0);
    }

    clickDistort() {
        this.dist.distortion = 1;
        this.setState({ isDistorted: true });
    }

    clickNoDistort() {
        this.dist.distortion = 0;
        this.setState({ isDistorted: false });
    }

    render() {
        const { isLoaded } = this.state;
        console.log(this.state);

        return (
            <div className="Child2" >
                <button disabled={!isLoaded} onClick={this.clickStart}>
                    start
                </button>

                <button disabled={!isLoaded} onClick={this.clickDistort}>
                    distort
                </button>

                <button disabled={!isLoaded} onClick={this.clickNoDistort}>
                    no distort
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
