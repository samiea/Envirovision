import { setUpSun, drawSun, hoveredSunData, resizeSun } from "./sun";
import { setupLandscape, drawLandscape, drawSeaboard } from "./landscape";
import {
    setupMicroPlasticDrops,
    drawMicroPlasticDots,
    resizeMicroPlastics,
    hoveredMicroPlasticData,
} from "./microPlastics";
import {
    setupMacroPlastics,
    drawMacroPlastics,
    resizeMacroPlastics,
    hoveredMacroPlasticData,
} from "./macroPlastics";
import { setupMethaneBubbles, drawMethaneBubbles } from "./methaneBubbles";
import { setupSmogClouds, drawSmogClouds, hoveredSmogData } from "./smogClouds";
import { drawSky } from "./skyColor";
import { drawLegend } from "./legend";
import { hoveredBubbleData } from "./methaneBubbles";

export default function sketch(p) {
    const wrapper = document.getElementById("page-wrapper");

    // let showLegend = true;
    let temperatureData = null;
    let microGrowth2050 = null;
    let macroGrowth2050 = null;
    let currentDate = null;
    let carbonData = null;
    let methaneData = null;
    let seaLevelRise = null;
    let nitrousData = null;

    p.setup = () => {
        p.frameRate(30);
        const canvas = p.createCanvas(wrapper.offsetWidth, window.innerHeight); // adjust to window width and height
        canvas.id("p5-canvas");
        canvas.parent().remove();
        canvas.parent("app");
        document.getElementById("p5-canvas").style.display = "block";
        // document.getElementById("guide-button").onclick = () => showLegend = !showLegend; // set guide button to show guide and (use noFill)
        document.getElementById("play-audio-button").style.margin = '10px';
        document.getElementById("slider").style.bottom = `-${wrapper.offsetHeight}px`;
        document.getElementById("slider").style.visibility = 'visible';
        setupLandscape(p);
        setUpSun(p, temperatureData, currentDate);
        setupSmogClouds(p);
        setupMethaneBubbles(p, methaneData);
        setupMicroPlasticDrops(p);
        setupMacroPlastics(p);
    };

    p.draw = () => {
        p.clear();
        drawSky(p, carbonData, currentDate);
        drawSun(p, temperatureData, currentDate);
        drawLandscape(p, currentDate, seaLevelRise, temperatureData);
        drawSmogClouds(p, nitrousData, currentDate);
        drawMethaneBubbles(p, methaneData, currentDate, seaLevelRise);
        drawSeaboard(p);
        drawMicroPlasticDots(p, microGrowth2050, currentDate, seaLevelRise);
        drawMacroPlastics(p, macroGrowth2050, currentDate, seaLevelRise);

        if (hoveredBubbleData.mouseOver) {
            const text =
                "The bubbles rising up through the ocean represent methane entering the atmosphere, and increase and decrease in number accordingly.";
            const value = hoveredBubbleData.value
                ? `Value: ${hoveredBubbleData.value} ppb`
                : `[No Value For Current Date]`;
            p.noFill();
            drawLegend(p, text, value);
        } else if (hoveredMacroPlasticData.mouseOver) {
            const text =
                "The piles or circles on top the ocean represent macroplastic, and increase and decrease in number accordingly.\n" +
                (hoveredMacroPlasticData.value
                    ? `Macroplastic value: ${hoveredMacroPlasticData.value} tons\n`
                    : `[No Value For Current Date]\n`) +
                "The white dots or circles falling from top the ocean represent microplastic, and increase and decrease in number accordingly.\n" +
                (hoveredMicroPlasticData.value
                    ? `Microplastic value: ${hoveredMicroPlasticData.value} tons`
                    : `[No Value For Current Date]`);
            p.noFill();
            drawLegend(p, text, " ");
        } else if (hoveredSunData.mouseOver) {
            const text =
                "The sun and ocean grow and change color with the tempature of the planet.";
            const value = hoveredSunData.value
                ? `Value: ${hoveredSunData.value} degree C`
                : `[No Value For Current Date]`;
            p.noFill();
            drawLegend(p, text, value);
        } else if (hoveredMicroPlasticData.mouseOver) {
            const text =
                "The white dots or circles falling from top the ocean represent microplastic, and increase and decrease in number accordingly.";
            const value = hoveredMicroPlasticData.value
                ? `Value: ${hoveredMicroPlasticData.value} tons`
                : `[No Value For Current Date]`;
            p.noFill();
            drawLegend(p, text, value);
        } else if (hoveredSmogData.mouseOver) {
            const text =
                "The smog clouds represent the nitrous oxide in the atmosphere.";
            const value = hoveredSmogData.value
                ? `Value: ${hoveredSmogData.value} ppb`
                : `[No Value For Current Date]`;
            p.noFill();
            drawLegend(p, text, value);
        }
    };

    p.windowResized = () => {
        p.resizeCanvas(wrapper.offsetWidth, p.windowHeight);
        document.getElementById("slider").style.bottom = `-${wrapper.offsetHeight}px`;
        resizeSun(p);
        resizeMicroPlastics(p);
        resizeMacroPlastics(p);
        p.redraw();
    };

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
}
