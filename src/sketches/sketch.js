import { drawSun } from "./sun";
import { setupLandscape, drawLandscape, drawSeaboard } from "./landscape";
import { setupMicroPlasticDrops, drawMicroPlasticDots } from "./microPlastics";
import { setupMacroPlastics, drawMacroPlastics } from "./macroPlastics";
import { setupMethaneBubbles, drawMethaneBubbles } from "./methaneBubbles";
import { setupSmogClouds, drawSmogClouds } from "./smogClouds";
import { drawSky } from "./skyColor";
import { drawLegend, drawAllLegends } from "./legend";
import { hoveredBubbleData } from "./methaneBubbles";

export default function sketch(p) {
    let temperatureData = null;
    let microGrowth2050 = null;
    let macroGrowth2050 = null;
    let currentDate = null;
    let carbonData = null;
    let methaneData = null;

    let showLegend = false;

    p.setup = () => {
        p.frameRate(30);
        p.createCanvas(p.windowWidth, p.windowHeight); // adjust to window width and height
        setupLandscape(p);
        setupSmogClouds(p);
        setupMethaneBubbles(p, methaneData);
        setupMicroPlasticDrops(p);
        setupMacroPlastics(p);
    };

    p.draw = () => {
        p.clear();
        drawSky(p, carbonData, currentDate);
        drawSun(p, temperatureData, currentDate);

        drawLandscape(p,currentDate);
        drawSmogClouds(p);
        drawMethaneBubbles(p, methaneData, currentDate);
        drawSeaboard(p);
        drawMicroPlasticDots(p, microGrowth2050, currentDate);
        drawMacroPlastics(p, macroGrowth2050, currentDate);

        if (hoveredBubbleData.mouseOver) {
            const text = "The bubbles rising up through the ocean represent methane entering the atmosphere, and increase and decrease in number accordingly.";
            const value = hoveredBubbleData.value ? `Value: ${hoveredBubbleData.value}` : `[No Value For Current Date]`;
            p.noFill();
            drawLegend(p, text, value);
        }

        // if (showLegend) { // commented this for demo/testing purposes
        //     p.noFill();
        //     drawAllLegends(p);
        // }
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.redraw();
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        temperatureData = newProps.temperatureData;
        currentDate = newProps.currentDate;
        microGrowth2050 = newProps.microGrowth2050;
        macroGrowth2050 = newProps.macroGrowth2050;
        carbonData = newProps.carbonData;
        methaneData = newProps.methaneData;
    };

    p.mouseClicked = () => {
        if(p.mouseX < p.width && p.mouseX > 0 && p.mouseY < p.height && p.mouseY > 0){
            showLegend = !showLegend;
        }
    };
}
