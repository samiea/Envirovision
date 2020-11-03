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
 *      - Bubble sounds
 *   - Fat Oscillator:
 *      - Sun
 *      - Bass note
 *   - AM Oscillator:
 *      - Microplastics
 *      - Interval quality
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
            consonantIntervals: [0, 4, 7, 9], //unison, maj third, perf fifth, maj sixth
            dissonantIntervals: [1, 2, 3, 5, 6, 8, 10, 11], //min second, maj second, min third, perf fourth, tritone, min sixth, min seventh, maj seventh
            consonanceProbability: 100,
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

        //Effects
        this.dist = new Tone.Distortion(0).toDestination();

        this.rev = new Tone.Reverb(1).toDestination();

        //Sound sources
        this.buffer = new Tone.ToneAudioBuffer();
        //this.buffer.debug = true;
        this.buffer.load(bubbles);

        this.player = new Tone.Player(this.buffer, () => {
            console.log("Player ready!");
            this.setState({ isLoaded: true });
            this.player.loop = true;
            this.initialize();
        }).chain(this.dist, this.rev, Tone.Destination);

        this.fatOsc = new Tone.FatOscillator("C3", "sawtooth", 40).chain(this.dist, this.rev, Tone.Destination);

        this.am = new Tone.AMOscillator("E3", "sine", "square").chain(this.dist, this.rev, Tone.Destination);
    
        this.fm = new Tone.FMOscillator("G3", "sine", "square").chain(this.dist, this.rev, Tone.Destination);
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
        this.rev.decay = 12;

        Tone.Transport.scheduleRepeat((time) => {
            this.getNewData();
            console.log("Starting repeating event...");
            //Use microplastics data to determine probability of consonance or dissonance, then randomly select from the consonant or dissonant interval arrays
            
            //this.state.consonanceProbability goes from 0 to 100
            console.log("Consonance probability:");
            console.log(this.state.consonanceProbability);
            var rand = Math.random() * 100; //get random number between 0 and 100
            
            if (rand < this.state.consonanceProbability) {
                console.log("Consonant interval!");
                var intervalIndex = Math.floor(Math.random() * 4);
                this.am.frequency.rampTo(this.state.trebleFreqs[this.state.freqIndex + this.state.consonantIntervals[intervalIndex]]);
            }
            else {
                console.log("Dissonant interval!");
                var intervalIndex = Math.floor(Math.random() * 8);
                this.am.frequency.rampTo(this.state.trebleFreqs[this.state.freqIndex + this.state.dissonantIntervals[intervalIndex]]);
            }

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

    getNewData() {
        //get current date
        var currDate = this.props.currentDate.getFullYear();
        
        //calculate index for temperature data
        var index = ((currDate - 1880) * this.props.temperatureData.length) / 140 - 100;
        index = Math.round(index);

        //map from -1 - 1 to 0 - 10 using (value - x1) * (y2 - x2) / (y1 - x1) + x2
        var frequency = (this.props.temperatureData[index].station + 1) * (10 - 0) / (1 + 1);
        index = Math.floor(frequency) % 11;
        console.log("Index:");
        console.log(index);
        this.setState({ freqIndex: index });

        //calculate index for microplastics data
        index = (currDate - 1950);

        //map from 90 to 620 to 0 to 100 using same formula as above
        var cp = (this.props.microGrowth2050[index][1] - 90) * (100 - 0) / (620 + 90);
        this.setState({ consonanceProbability: cp });        
    }

    render() {
        const { isLoaded } = this.state;
        console.log(this.state);

        return (
            <div className="Child2" >
                <button disabled={!isLoaded} onClick={this.startAudio}>
                    audio on/off
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

