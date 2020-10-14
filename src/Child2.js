import React from "react";
import * as Tone from "tone";
import ori from "./sounds/oriMainTheme.m4a"
import "./Child2.css";

class Child2 extends React.Component {
    constructor(props) {
        super(props);
        
        //Setting state
        this.state = { 
            isLoaded: false,
            isDistorted: false,
            isReverbOn: false
        };

        //Binding functions
        this.clickStartAudio = this.clickStartAudio.bind(this);
        this.clickFatOsc = this.clickFatOsc.bind(this);
        this.clickAMOsc = this.clickAMOsc.bind(this);
        this.clickFMOsc = this.clickFMOsc.bind(this);
        this.clickDistort = this.clickDistort.bind(this);
        this.clickNoDistort = this.clickNoDistort.bind(this);
        this.clickReverb = this.clickReverb.bind(this);
        this.clickNoReverb = this.clickNoReverb.bind(this);

        //Effects
        this.dist = new Tone.Distortion(0).toDestination();

        this.rev = new Tone.Reverb(1).toDestination();

        //Sound sources

        this.buffer = new Tone.ToneAudioBuffer(ori, () => {
            console.log("Loading successful!");
        }, () => {
            console.log("ERROR LOADING SOUND!");
        });

        this.player = new Tone.Player(this.buffer, () => {
            console.log("Player ready!");
            this.setState({ isLoaded: true });
            Tone.start();
        }).chain(this.dist, this.rev, Tone.Destination);

        this.fatOsc = new Tone.FatOscillator("C3", "sawtooth", 40).chain(this.dist, this.rev, Tone.Destination);

        this.am = new Tone.AMOscillator("E3", "sine", "square").chain(this.dist, this.rev, Tone.Destination);
    
        this.fm = new Tone.FMOscillator("G3", "sine", "square").chain(this.dist, this.rev, Tone.Destination);
    }

    clickStartAudio() {
        this.player.start(Tone.now());
    }

    clickFatOsc() {
        this.fatOsc.start(Tone.now());
    }

    clickAMOsc() {
        this.am.start(Tone.now());
    }

    clickFMOsc() {
        this.fm.start(Tone.now());
    }

    clickDistort() {
        this.dist.distortion = 1;
        this.setState({ isDistorted: true });
    }

    clickNoDistort() {
        this.dist.distortion = 0;
        this.setState({ isDistorted: false });
    }

    clickReverb() {
        this.rev.decay = 10;
        this.setState({ isReverbOn: true });
    }

    clickNoReverb() {
        this.rev.decay = 1;
        this.setState({ isReverbOn: true });
    }

    render() {
        const { isLoaded } = this.state;
        console.log(this.state);

        return (
            <div className="Child2" >
                <button disabled={!isLoaded} onClick={this.clickStartAudio}>
                    start playback
                </button>

                <button disabled={!isLoaded} onClick={this.clickFatOsc}>
                    start fat osc
                </button>

                <button disabled={!isLoaded} onClick={this.clickAMOsc}>
                    start am osc
                </button>

                <button disabled={!isLoaded} onClick={this.clickFMOsc}>
                    start fm osc
                </button>

                <button disabled={!isLoaded} onClick={this.clickDistort}>
                    distort
                </button>

                <button disabled={!isLoaded} onClick={this.clickNoDistort}>
                    no distort
                </button>

                <button disabled={!isLoaded} onClick={this.clickReverb}>
                    reverb
                </button>

                <button disabled={!isLoaded} onClick={this.clickNoReverb}>
                    no reverb
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
