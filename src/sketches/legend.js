import { black, white } from "color-name";

export function drawLegend(p) {
    let fillColor = p.color(255, 255, 255);
    fillColor.setAlpha(200);
    p.noStroke();
    p.fill(fillColor);
    p.rect(100, 100, p.width - 200, p.height - 200);

    p.noFill();
    p.stroke(black);
    p.strokeWeight(50);
    p.rect(100, 100, p.width - 200, p.height - 200);

    p.fill(0);
    p.textSize(36);
    p.strokeWeight(1);
    p.textAlign(p.CENTER);
    p.text("Legend", p.width/2, 200);

    p.textAlign(p.CENTER);
    p.textSize(24);
    p.text("Welcome to our visualization! Provided here are explanations of what data different attributes of the landscape correspond to.", p.width/2, 250);

    p.textAlign(p.LEFT);
    p.textSize(24);
    p.text("Sky Color\nThe color of the sky is based off carbon dioxide data, darkening as CO2 levels in the atmosphere increase.", 200, 300);
    p.text("Sun Size\nThe sun increases and decreases in size based on global temperature averages - larger means hotter, smaller means cooler.", 200, 375);
    p.text("Smog\nThe grey smog clouds increase and decrease in density, size, and number based off of nitrous oxide levels in the atmosphere.", 200, 450);
    p.text("Ocean Level\n(Currerntly not based on an API. Will be soon.)", 200, 525);
    p.text("Microplastics\nThe small white dots drifting downward through the ocean represent microplastics, tiny plastic particulates polluting the oceans.\nThey"+
    " increase and decrease in number based on microplastic levels in the oceans.", 200, 600);
    p.text("Macroplastics\nThe large brown and grey shapes on the ocean surface represent macroplastics, larger plastic objects polluting the oceans.\nThey"
    +" increase and decrease in number based on macroplastic levels in the oceans.", 200, 700);
    p.text("Bubbles\nThe bubbles rising up through the ocean represent methane entering the atmosphere, and increase and decrease in number accordingly.", 200, 800);

    p.noStroke();
}