import { setUpSun, drawSun, hoveredSunData } from "./sun";
import { setupLandscape, drawLandscape, drawSeaboard } from "./landscape";
import { setupMicroPlasticDrops, drawMicroPlasticDots, hoveredMicroPlasticData } from "./microPlastics";
import { setupMacroPlastics, drawMacroPlastics, hoveredMacroPlasticData } from "./macroPlastics";
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
    let seaLevelRise = null;
    let nitrousData = null;

    let showLegend = false;


    p.setup = () => {
        p.frameRate(30);
        p.createCanvas(p.windowWidth, p.windowHeight); // adjust to window width and height
        setupLandscape(p);
        setUpSun(p,temperatureData, currentDate);
        setupSmogClouds(p);
        setupMethaneBubbles(p, methaneData);
        setupMicroPlasticDrops(p);
        setupMacroPlastics(p);

    };

    p.draw = () => {
        p.clear();
        drawSky(p, carbonData, currentDate);
        drawSun(p, temperatureData, currentDate);

        drawLandscape(p,currentDate, seaLevelRise,temperatureData);
        drawSmogClouds(p, nitrousData, currentDate);
        drawMethaneBubbles(p, methaneData, currentDate, seaLevelRise);
        drawSeaboard(p);
        drawMicroPlasticDots(p, microGrowth2050, currentDate, seaLevelRise);
        drawMacroPlastics(p, macroGrowth2050, currentDate, seaLevelRise);

        if (hoveredBubbleData.mouseOver) {
            const text = "The bubbles rising up through the ocean represent methane entering the atmosphere, and increase and decrease in number accordingly.";
            const value = hoveredBubbleData.value ? `Value: ${hoveredBubbleData.value} ppb` : `[No Value For Current Date]`;
            p.noFill();
            drawLegend(p, text, value);
        }
        if (hoveredMacroPlasticData.mouseOver) {
            const text = "The piles or circles on top the ocean represent macroplastic, and increase and decrease in number accordingly.";
            const value = hoveredMacroPlasticData.value ? `Value: ${hoveredMacroPlasticData.value} tons` : `[No Value For Current Date]`;
            p.noFill();
            drawLegend(p, text, value);
        }
        if (hoveredSunData.mouseOver) {
            const text = "The sun and ocean grow and change color with the tempature of the planet.";
            const value = hoveredSunData.value ? `Value: ${hoveredSunData.value} degree C` : `[No Value For Current Date]`;
            p.noFill();
            drawLegend(p, text, value);
        }
        if (hoveredMicroPlasticData.mouseOver) {
            const text = "The white dots or circles falling from top the ocean represent microplastic, and increase and decrease in number accordingly.";
            const value = hoveredMicroPlasticData.value ? `Value: ${hoveredMicroPlasticData.value} tons` : `[No Value For Current Date]`;
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
        seaLevelRise = newProps.seaLevelRise;
        nitrousData = newProps.nitrousData;
    };

    p.mouseClicked = () => {
        if(p.mouseX < p.width && p.mouseX > 0 && p.mouseY < p.height && p.mouseY > 0){
            showLegend = !showLegend;
        }
    };
}
