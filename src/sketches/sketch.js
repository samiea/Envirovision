import e from "cors";
import { isCompositeComponent } from "react-dom/test-utils";
import { sun, setupSun } from './sun';
import { setupWave, wave } from "./wave";
import {setupDrops,drawDots} from './microPlastic'


export default function sketch(p) {

    let temperatureData = null;
    let canvas = null;
    let microGrowth2050 = null;
    let currentDate = null;

    p.setup = () => {
        canvas = p.createCanvas(600, 600);
        p.noStroke();
        setupSun(p);
        setupWave(p);
        setupDrops(p);
    }

    p.draw = () => {
        p.background("blue");
        p.fill("yellow");
        sun(p, temperatureData);
        wave(p);
        drawDots(p,microGrowth2050,currentDate);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {

        temperatureData = newProps.temperatureData;
        currentDate = newProps.currentDate;
        microGrowth2050 = newProps.microGrowth2050;
                


    }
}
