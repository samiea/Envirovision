import React from "react";
import * as Tone from "tone";
import ori from "./sounds/oriMainTheme.m4a"
import "./Child2.css";

/*
 * SONIFICATION DESIGN:
 * - Receives data from parent component
 * - Four layers of audio:
 *   - Playback:
 *      - Ocean
 *      - Bubble sounds (randomized from an array of samples)
 *   - Fat Oscillator:
 *      - Sun
 *      - Bass note
 *   - AM Oscillator:
 *      - Microplastics
 *   - FM Oscillator:
 *      - Empty for now; another tool
 */
class Child2 extends React.Component {
    constructor(props) {
        super(props);
        
        //Setting state
        this.state = { 
            //Sounds load states
            isLoaded: false,
            //Effects levels
            distortionLevel: 0,
            reverbLevel: 0,
            //Frequencies
            bassIndex: 0,
            bassFreqs: [65.41, 69.30, 73.42, 77.78, 82.41, 87.31, 92.50, 98.00, 103.83, 110.00, 116.54, 123.47], //C2-B2
            intervals: [0, 4, 7, 9], //unison, third, fifth, sixth
            //All audio on/off
            audioState: false,
            //Audio layer solo states
            playbackState: false,
            fatOscState: false,
            amOscState: false,
            //Updating
            updateCount: 0,
            dataUpdateCount: 0
        };

        //Binding functions
        this.initialize = this.initialize.bind(this);
        this.startAudio = this.startAudio.bind(this);
        this.togglePlayback = this.togglePlayback.bind(this);
        this.toggleFatOsc = this.toggleFatOsc.bind(this);
        this.toggleAMOsc = this.toggleAMOsc.bind(this);
        this.getNewData = this.getNewData.bind(this);

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
            this.initialize();
        }).chain(this.dist, this.rev, Tone.Destination);

        this.fatOsc = new Tone.FatOscillator("C3", "sawtooth", 40).chain(this.dist, this.rev, Tone.Destination);

        this.am = new Tone.AMOscillator("E3", "sine", "square").chain(this.dist, this.rev, Tone.Destination);
    
        this.fm = new Tone.FMOscillator("G3", "sine", "square").chain(this.dist, this.rev, Tone.Destination);
    }

    initialize() {
        //set state and start Tone
        this.getNewData();
        console.log("Player ready!");
        this.setState({ isLoaded: true });
        Tone.start();

        //set volume
        this.player.volume = -100;
        this.fatOsc.volume = -100;
        this.am.volume = -100;

        //set frequency
        this.fatOsc.frequency.rampTo(this.state.bassFreqs[this.state.bassIndex] / 4);
        this.am.frequency.rampTo(this.state.bassFreqs[this.state.bassIndex] / 4);
    }

    startAudio() {
        this.getNewData();
        this.rev.decay = 10; //TODO: what's controlling reverb?

        this.fatOsc.frequency.rampTo(this.state.bassFreqs[this.state.bassIndex]);
        
        if (this.state.audioState === false) {
            this.player.start(Tone.now());
            this.fatOsc.start(Tone.now());
            this.am.start(Tone.now());

            this.player.volume.rampTo(0);
            this.fatOsc.volume.rampTo(-12);
            this.am.volume.rampTo(-12);
            this.setState({ audioState: true });
        }
        else if (this.state.audioState === true) {
            this.player.volume.rampTo(-100);
            this.fatOsc.volume.rampTo(-100);
            this.am.volume.rampTo(-100);

            this.player.stop(Tone.now());
            this.fatOsc.stop(Tone.now());
            this.am.stop(Tone.now());

            this.setState({ audioState: false });
        }
    }

    togglePlayback() {
        this.getNewData();
        //TODO: play bubble sounds with set reverb

        if (this.state.playbackState === false) {
            this.player.volume.rampTo(0);

            this.setState({ playbackState: true });
        }
        else if (this.state.playbackState === true) {
            this.player.volume.rampTo(-100);

            this.setState({ playbackState: false });
        }
    }

    toggleFatOsc() {
        this.getNewData();
        
        if (this.state.fatOscState === false) {
            this.fatOsc.volume.rampTo(-12);

            this.setState({ fatOscState: true });
        }
        else if (this.state.playbackState === true) {
            this.fatOsc.volume.rampTo(-100);

            this.setState({ fatOscState: false });
        }
    }

    toggleAMOsc() {
        this.getNewData();

        this.am.frequency.rampTo(this.state.bassFreqs[(this.state.bassIndex + Math.floor(Math.random() * 10) + 1) % 11] * 2);

        if (this.state.playbackState === false) {
            this.am.volume.rampTo(-12);

            this.setState({ amOscState: true });
        }
        else if (this.state.playbackState === true) {
            this.am.volume.rampTo(-100);

            this.setState({ amOscState: false });
        }
    }

    getNewData() {
        //get current date
        var currDate = this.props.currentDate.getFullYear();
        
        //calculate index for temperature data
        var index = ((currDate - 1880) * this.props.temperatureData.length) / 140 - 100;
        index = Math.round(index);

        //map from -1 - 1 to 0 - 10 using (value - x1) * (y2 - x2) / (y1 - x1) + x2
        var frequency = (this.props.temperatureData[index].station + 1) * (10 - 0) / (1 + 1) + 10;
        index = Math.floor(frequency) % 11;
        console.log("Index:");
        console.log(index);
        this.setState({ bassIndex: index });

        //calculate index for microplastics data
        index = (currDate - 2000) * 5;

        //map from 90 to 620 to //TODO: VALUES??// using same formula as above
    }

    render() {
        const { isLoaded } = this.state;
        console.log(this.state);

        return (
            <div className="Child2" >
                <button disabled={!isLoaded} onClick={this.startAudio}>
                    audio on/off
                </button>

                <button disabled={!isLoaded} onClick={this.togglePlayback}>
                    pb
                </button>

                <button disabled={!isLoaded} onClick={this.toggleFatOsc}>
                    fat osc
                </button>

                <button disabled={!isLoaded} onClick={this.toggleAMOsc}>
                    am osc
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

