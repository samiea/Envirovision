export default function sketch(p) {
    var temperatureData = null;
    var yvalues;
    var size_index = 0;

    p.setup = () => {
        p.createCanvas(600, 300);
        p.noStroke();
        yvalues = new Array(p.floor(200));
    };

    p.draw = () => {
        p.background("blue");
        p.calcSun();
        p.changeY();
        p.drawSun();
    };

    p.calcSun = () => {
        if (temperatureData != null) {
            for (let i = 0; i < temperatureData.length / 8; i++) {
                var average = parseFloat(temperatureData[i * 8].station); // + parseFloat(temperatureData[i * 8].land)) / 2);
                yvalues[i] = average + 1;
            }
        }
    };

    p.changeY = () => {
        if (size_index === yvalues.length) size_index = 0;

        size_index += 1;
    };

    p.drawSun = () => {
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

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        // newProps receives two props from parent contained within default tempArray object
        // note: tempArray is not to be confused with temperature; it's short for temporary array
        temperatureData = newProps.temperatureData;
    };
}
