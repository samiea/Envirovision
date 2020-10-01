import "../libs/p5sound";
import p5 from "p5";

export default function sketch(p) {
    let canvas;
    let osc;
    let playing;
    let freq;
    let amp;

    function playOscillator() {
        osc.start();
        playing = true;
        freq = 440;
        amp = 0.1;
    }

    p.setup = () => {
        canvas = p.createCanvas(600, 300);
        canvas.mousePressed(playOscillator);
        osc = new p5.Oscillator('sine');
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
    }

    p.draw = () => {
        freq = p.constrain(p.map(p.mouseX, 0, p.width, 100, 500), 100, 500);
        amp = p.constrain(p.map(p.mouseY, p.height, 0, 0, 1), 0, 1);

        if (playing) {
            //smooth the transitions by 0.1 seconds
            osc.freq(freq, 0.1);
            osc.amp(amp, 0.1);
        }
    }

    p.mouseReleased = () => {
        osc.amp(0, 0.5);
        playing = false;
    }
}
