export default function wave(p) {
    // let xspacing = 16; // Distance between each horizontal location
    // let w; // Width of entire wave
    // let theta = 0.15; // Start angle at 0
    // let amplitude = 75.0; // Height of wave
    // let period = 500.0; // How many pixels before the wave repeats
    // let dx = 2; // Value for incrementing x
    // let yvalues; // Using an array to store height values for the wave
    // let backvalues;
    // let back = 2; // back offset

    // p.setup = () => {
    //     p.createCanvas(600, 300);
    //     w = p.width + 16;
    //     dx = ((2 * Math.PI) / period) * xspacing;
    //     yvalues = new Array(p.floor(w / xspacing));
    //     backvalues = new Array(p.floor(w / xspacing));
    // };
    // p.draw = () => {
    //     p.background("blue");
    //     p.calcWave();
    //     p.renderWave();
    //     p.backWave();
    // };

    // p.calcWave = () => {
    //     // Increment theta (try different values for
    //     // 'angular velocity' here)
    //     theta += 0.02;

    //     // For every x value, calculate a y value with sine function
    //     let x = theta;
    //     for (let i = 0; i < yvalues.length; i++) {
    //         yvalues[i] = Math.sin(x) * amplitude;
    //         backvalues[i] = Math.sin(x + back) * amplitude;
    //         x += dx;
    //     }
    // };
    // p.renderWave = () => {
    //     p.noStroke();
    //     p.fill(37, 207, 122);
    //     // A simple way to draw the wave with an ellipse at each location
    //     for (let x = 0; x < yvalues.length; x++) {
    //         var waveHeight = (4 * p.height) / 8 + yvalues[x];
    //         p.ellipse(x * xspacing, p.height, 64, waveHeight);
    //     }
    // };
    // p.backWave = () => {
    //     p.noStroke();
    //     p.fill(19, 149, 244);
    //     // A simple way to draw the wave with an ellipse at each location
    //     for (let x = 0; x < backvalues.length; x++) {
    //         var waveHeight = (4 * p.height) / 8 + backvalues[x];
    //         p.ellipse(x * xspacing, p.height, 64, waveHeight);
    //     }
    // };


    const width = p.windowWidth;
    const height = p.windowHeight;
    let yoff = 0.0; // 2nd dimension of perlin noise

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      }

    p.setup = () => {
        p.createCanvas(width, height);
    }

    p.draw = () => {
        p.background(51);

        p.fill(255);
        // We are going to draw a polygon out of the wave points
        p.beginShape();

        let xoff = 0; // Option #1: 2D Noise
        // let xoff = yoff; // Option #2: 1D Noise

        // Iterate over horizontal pixels
        for (let x = 0; x <= width; x += 10) {
            // Calculate a y value according to noise, map to

            // // Option #1: 2D Noise
            let y = p.map(p.noise(xoff, yoff), 0, 1, 200, 300);

            // Option #2: 1D Noise
            // let y = p.map(p.noise(xoff), 0, 1, 200,300);

            // Set the vertex
            p.vertex(x, y);
            // Increment x dimension for noise
            xoff += 0.05;
        }
        // increment y dimension for noise
        yoff += 0.01;
        p.vertex(width, height);
        p.vertex(0, height);
        p.endShape(p.CLOSE);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        console.log(newProps);
        // yoff = 0.05;
        // newProps receives two props from parent contained within default tempArray object
        // note: tempArray is not to be confused with temperature; it's short for temporary array
    };
}
