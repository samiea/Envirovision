var yvalues;
var size_index = 0;

export function setupSun(p) {
    p.noStroke();
    yvalues = new Array(p.floor(200));
    p.background("blue");
}

export function sun(p, temperatureData) {
    calcSun(temperatureData);
    changeY();
    drawSun(p, temperatureData);
}

function calcSun(temperatureData) {
    if (temperatureData != null) {
        for (let i = 0; i < temperatureData.length / 8; i++) {
            var average = parseFloat(temperatureData[i * 8].station); // + parseFloat(temperatureData[i * 8].land)) / 2);
            yvalues[i] = average + 1;
        }
    }
};

let changeY = () => {
    if (size_index === yvalues.length) size_index = 0;

    size_index += 1;
};

function drawSun(p, temperatureData) {
    if (temperatureData != null) {
        p.ellipse(
            p.width,
            0,
            yvalues[size_index] * 50,
            yvalues[size_index] * 50
        );
        p.fill("yellow");
    }
};


