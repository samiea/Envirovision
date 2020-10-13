import { drawSun } from './sun';
import { setupLandscape, drawLandscape } from './landscape';
import { setupDrops, drawDots } from './microPlastic'

export default function sketch(p) {
    let temperatureData = null;
    let microGrowth2050 = null;
    let currentDate = null;

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight); // adjust to window width and height
        setupLandscape(p);
        setupDrops(p,microGrowth2050);
    }

    p.draw = () => {
        drawLandscape(p, temperatureData, currentDate);
        drawDots(p,microGrowth2050,currentDate);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        temperatureData = newProps.temperatureData;
        currentDate = newProps.currentDate;
        microGrowth2050 = newProps.microGrowth2050;
    }
}
