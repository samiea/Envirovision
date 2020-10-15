import { drawSun } from './sun';
import { setupLandscape, drawLandscape } from './landscape';
import { setupDrops, drawDots } from './microPlastic'
import {setupPlastic, drawPlastic} from './macroPlastic'
import {drawSky} from './skyColor'

export default function sketch(p) {
    let temperatureData = null;
    let microGrowth2050 = null;
    let macroGrowth2050 = null;
    let currentDate = null;
    let carbonData = null;

    p.setup = () => {
        p.frameRate(30);
        p.createCanvas(p.windowWidth, p.windowHeight); // adjust to window width and height
        setupLandscape(p);
        setupDrops(p,microGrowth2050);
        setupPlastic(p,macroGrowth2050);
    }

    p.draw = () => {

        drawSky(p, carbonData)
        drawSun(p, temperatureData, currentDate);

        drawLandscape(p, temperatureData, currentDate);
        drawDots(p,microGrowth2050,currentDate);
        drawPlastic(p,macroGrowth2050,currentDate);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        temperatureData = newProps.temperatureData;
        currentDate = newProps.currentDate;
        microGrowth2050 = newProps.microGrowth2050;
        macroGrowth2050 = newProps.macroGrowth2050;
        carbonData = newProps.carbonData;
    }
}
