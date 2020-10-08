import e from "cors";
import { isCompositeComponent } from "react-dom/test-utils";
import { sun, setupSun } from './sun';
import { setupWave, wave } from "./wave";


export default function sketch(p) {
    let temperatureData = null;
    let canvas = null;

    p.setup = () => {
        canvas = p.createCanvas(600, 600);
        p.noStroke();
        setupSun(p);
        setupWave(p);
    }

    p.draw = () => {
        p.background("blue");
        p.fill("yellow");
        sun(p, temperatureData);
        wave(p);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        console.log(temperatureData);
        temperatureData = newProps.temperatureData;
    }
}
