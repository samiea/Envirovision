import { initValues, calcWave, renderWave, backWave } from "./wave.js"

export default function sketch(p) {
    let canvas;

    p.setup = () => {
        canvas = p.createCanvas(600, 600);
        console.log("About to run initValues");
        initValues(p);
        p.noStroke();
    }

    p.draw = () => {
        p.background('blue');
        calcWave(p);
        renderWave(p);
        backWave(p);
        
    }

}
