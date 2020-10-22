import { drawSun } from './sun';
import { setupLandscape, drawLandscape } from './landscape';
import { setupDrops, drawDots } from './microPlastic'

let skyView = false;
let wipeDownExpand = false;
let wipeDownContract = false;

function skySwap() {
    skyView = !skyView;
    wipeDownExpand = true;
}

export default function sketch(p) {
    let temperatureData = null;
    let microGrowth2050 = null;
    let currentDate = null;
    let transitionY = 0;
    let transitionX = 0;

    p.setup = () => {
        p.frameRate(30);
        p.createCanvas(p.windowWidth, p.windowHeight); // adjust to window width and height
        setupLandscape(p);
        setupDrops(p,microGrowth2050);
    }

    p.draw = () => {
        if(!skyView) {
            drawLandscape(p, temperatureData, currentDate);
            drawDots(p,microGrowth2050,currentDate);
        }
        else if(wipeDownExpand) {
            drawLandscape(p, temperatureData, currentDate);
            drawDots(p,microGrowth2050,currentDate);
            p.fill(0);
            p.rect(transitionX, 0, p.width, transitionY);
            transitionY += 5;
            if(transitionY >= p.height) {
                wipeDownExpand = false;
                wipeDownContract = true;
            }
        }
        else if(wipeDownContract) {
            drawLandscape(p, temperatureData, currentDate);
            drawDots(p,microGrowth2050,currentDate);
            p.fill(0);
            p.rect(transitionX, p.height - transitionY, p.width, transitionY);
            transitionY -= 5;
            console.log("contracting");
        }
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        temperatureData = newProps.temperatureData;
        currentDate = newProps.currentDate;
        microGrowth2050 = newProps.microGrowth2050;
    }

    p.mouseClicked = () => {
        skySwap();
    }

}

