import React from "react";
import * as Tone from "tone";
import bubbles from "./sounds/bubbles.wav";
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
            freqIndex: 0,
            bassFreqs: [65.41, 69.30, 73.42, 77.78, 82.41, 87.31, 92.50, 98.00, 103.83, 110.00, 116.54, 123.47], //C2-B2
            trebleFreqs: [523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880.00, 932.33, 987.77], //C5-B5
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
        this.getNewData = this.getNewData.bind(this);
        this.record = this.record.bind(this);

        //Effects
        this.dist = new Tone.Distortion(0).toDestination();

        this.rev = new Tone.Reverb(1).toDestination();

        //Recorder
        this.recorder = new Tone.Recorder();

        //Sound sources
        this.buffer = new Tone.ToneAudioBuffer();
        //this.buffer.debug = true;
        this.buffer.load(bubbles);

        this.player = new Tone.Player(this.buffer, () => {
            console.log("Player ready!");
            this.setState({ isLoaded: true });
            this.player.loop = true;
            this.initialize();
        }).chain(this.dist, this.rev, Tone.Destination, this.recorder);

        this.fatOsc = new Tone.FatOscillator("C3", "sawtooth", 40).chain(this.dist, this.rev, Tone.Destination, this.recorder);

        this.am = new Tone.AMOscillator("E3", "sine", "square").chain(this.dist, this.rev, Tone.Destination, this.recorder);
    
        this.fm = new Tone.FMOscillator("G3", "sine", "square").chain(this.dist, this.rev, Tone.Destination, this.recorder);
    }

    initialize() {
        //set state and start Tone
        this.getNewData();
        Tone.start();
        Tone.Transport.start();

        //set volume
        this.player.volume.value = -100;
        this.fatOsc.volume.value = -100;
        this.am.volume.value = -100;

        //set frequency
        this.fatOsc.frequency.rampTo(this.state.bassFreqs[this.state.freqIndex]);
        this.am.frequency.rampTo(this.state.trebleFreqs[this.state.freqIndex + 7]);
    }

    startAudio() {
        this.getNewData();
        this.rev.decay = 12; //TODO: what's controlling reverb?

        Tone.Transport.scheduleRepeat((time) => {
            var intervalIndex = Math.floor(Math.random() * 4);
            console.log(intervalIndex);
            this.am.frequency.rampTo(this.state.trebleFreqs[this.state.freqIndex + this.state.intervals[intervalIndex]]);
        }, "4hz", Tone.now());

        this.fatOsc.frequency.rampTo(this.state.bassFreqs[this.state.freqIndex]);
        this.am.frequency.rampTo(this.state.trebleFreqs[this.state.freqIndex + 7]);

        if (this.state.audioState === false) {
            this.player.start(Tone.now());
            this.fatOsc.start(Tone.now());
            this.am.start(Tone.now());

            this.player.volume.rampTo(0);
            this.fatOsc.volume.rampTo(-16);
            this.am.volume.rampTo(-16);
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

    record() {
        this.recorder.start();

        setTimeout(async () => {
            const recording = await this.recorder.stop();
            const url = URL.createObjectURL(recording);
            const anchor = document.createElement("a");
            anchor.download = "recording.webm";
            anchor.href = url;
            anchor.click();
        }, 10000);
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
        this.setState({ freqIndex: index });

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

                <button disabled={!isLoaded} onClick={this.record}>
                    record
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

