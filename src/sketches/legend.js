import { black } from "color-name";

export function drawGuide(p) {
    // let fillColor = p.color(255, 255, 255);
    // fillColor.setAlpha(200);
    // p.noStroke();
    // p.fill(fillColor);
    // p.rect(100, 100, p.width - 200, p.height - 200);

    // p.noFill();
    // p.stroke(black);
    // p.strokeWeight(5);
    // p.rect(100, 100, p.width - 200, p.height - 200);

    // p.fill(0);
    // p.textSize(36);
    // p.strokeWeight(1);
    // p.textAlign(p.CENTER);
    // p.text("Guide", p.width/2, 200);

    // p.textAlign(p.CENTER);
    // p.textSize(24);
    // p.text("Welcome to our visualization! Provided here are explanations of what data different attributes of the landscape correspond to.", p.width/2, 250);

    // p.textAlign(p.LEFT);
    // p.textSize(24);
    // p.text("Sky Color\nThe color of the sky is based off carbon dioxide data, darkening as CO2 levels in the atmosphere increase.", 200, 300);
    // p.text("Sun Size\nThe sun increases and decreases in size based on global temperature averages - larger means hotter, smaller means cooler.", 200, 375);
    // p.text("Smog\nThe grey smog clouds increase and decrease in density, size, and number based off of nitrous oxide levels in the atmosphere.", 200, 450);
    // p.text("Ocean Level\nThe sea level rises or descends based off sea level data", 200, 525);
    // p.text("Microplastics\nThe small white dots drifting downward through the ocean represent microplastics, tiny plastic particulates polluting the oceans.\nThey"+
    // " increase and decrease in number based on microplastic levels in the oceans.", 200, 600);
    // p.text("Macroplastics\nThe large brown and grey shapes on the ocean surface represent macroplastics, larger plastic objects polluting the oceans.\nThey"
    // +" increase and decrease in number based on macroplastic levels in the oceans.", 200, 700);
    // p.text("Bubbles\nThe bubbles rising up through the ocean represent methane entering the atmosphere, and increase and decrease in number accordingly.", 200, 800);

    // p.noStroke();

    const maxWidth = window.screen.availWidth - (window.outerWidth - window.innerWidth);
    const width_ratio = p.windowWidth / maxWidth;
    
    const strokeWeight = 5; // font boldness
    
    const rightPadding = 80;
    const leftPadding = 80; // check if text box would go beyond window width
    const topPadding = 80;
    const bottomPadding = 150;
    
    const textSize = 20 * width_ratio; // scales with window width
    const textBoxWidth = p.width - rightPadding - leftPadding; // scales with window width
    const textBoxHeight = p.height - topPadding - bottomPadding; // scales with window height
    
    const fillColor = p.color(255, 255, 255);

    fillColor.setAlpha(200);
    p.noStroke();
    p.fill(fillColor);
    p.rect(leftPadding, topPadding, textBoxWidth, textBoxHeight);

    p.noFill();
    p.stroke(black);
    p.strokeWeight(strokeWeight);
    p.rect(leftPadding, topPadding, textBoxWidth, textBoxHeight);

    p.fill(0);
    p.strokeWeight(0.5);
    p.textAlign(p.LEFT);
    
    p.textSize(textSize);

    createText("Interact with moving objects on the visualization to display value representation of pollutants corresponding with the current period in time");
    createText("Sky Color: The color of the sky is based off carbon dioxide data, darkening as CO2 levels in the atmosphere increase.", 50);
    createText("Ocean Color: The color of the ocean is based off ocean pollution data, darkening as levels in the ocean increase.", 100);
    createText("Sun Size: The sun increases and decreases in size based on global temperature averages - larger means hotter, smaller means cooler.", 150);
    createText("Smog: The grey smog clouds increase and decrease in density, size, and number based off of nitrous oxide levels in the atmosphere.", 200);
    createText("Ocean Level: The sea level rises or descends based off sea level data", 250);
    createText("Microplastics: The small white dots drifting downward through the ocean represent microplastics, tiny plastic particulates polluting the oceans. They"+
        " increase and decrease in number based on microplastic levels in the oceans.", 300);
    createText("Macroplastics: The large brown and grey shapes on the ocean surface represent macroplastics, larger plastic objects polluting the oceans. They"
        +" increase and decrease in number based on macroplastic levels in the oceans.", 375);
    createText("Bubbles: The bubbles rising up through the ocean represent methane entering the atmosphere, and increase and decrease in number accordingly.", 450);

    p.noStroke();

    /**
     * Create wrapped text box
     * 
     * @param {*} text Text to create
     * @param {*} yoffset Optional parameter; offset from top to move text, otherwise 0 by default
     */
    function createText(text, yoffset) {
        if (!yoffset) yoffset = 0;
        p.text(text, 
            leftPadding + strokeWeight, // x-offset
                topPadding + textSize - strokeWeight * 2 + yoffset, // y-offset
                    p.width - leftPadding - rightPadding - strokeWeight * 2, // x-wrap
                        p.height - bottomPadding - topPadding - strokeWeight * 2); // y-wrap
    }
}

export function drawLegend(p, text, value) {
    const maxWidth = window.screen.availWidth - (window.outerWidth - window.innerWidth);
    const width_ratio = p.windowWidth / maxWidth;
    
    const strokeWeight = 5; // font boldness
    const bottomPadding = 3;
    const maxChars = 66;
    const numTextWraps = 1 + Math.ceil(text.length / maxChars); // add 1 for value representation
    
    const textSize = 20 * width_ratio; // scales with window width
    const textBoxWidth = 625 * width_ratio; // scales with window width
    const textBoxHeight = strokeWeight * numTextWraps + textSize * numTextWraps + bottomPadding; // scales with window height
    
    const leftMargin = p.mouseX + textBoxWidth + 20 > p.windowWidth ? -textBoxWidth - 20 : 20; // check if text box would go beyond window width

    const fillColor = p.color(255, 255, 255);

    const wrappedText = text.replace( // wrap text around 66 chars maximum
        /(?![^\n]{1,66}$)([^\n]{1,66})\s/g, '$1\n'
    );
    
    fillColor.setAlpha(200);
    p.noStroke();
    p.fill(fillColor);
    p.rect(leftMargin + p.mouseX, p.mouseY, textBoxWidth, textBoxHeight);

    p.noFill();
    p.stroke(black);
    p.strokeWeight(strokeWeight);
    p.rect(leftMargin + p.mouseX, p.mouseY, textBoxWidth, textBoxHeight);

    p.fill(0);
    p.strokeWeight(0.5);
    p.textAlign(p.LEFT);
    
    p.textSize(textSize);

    if (value) {
        p.text(wrappedText, leftMargin + strokeWeight + p.mouseX, p.mouseY + textSize);
        p.text(value, leftMargin + strokeWeight + p.mouseX, p.mouseY + (bottomPadding + textSize) * numTextWraps)
    }

    p.noStroke();
}