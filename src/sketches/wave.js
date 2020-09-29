
export default function wave(p) {

  let canvas;


  let xspacing = 16; // Distance between each horizontal location
  let w; // Width of entire wave
  let theta = 0.15; // Start angle at 0
  let amplitude = 75.0; // Height of wave
  let period = 500.0; // How many pixels before the wave repeats
  let dx=2; // Value for incrementing x
  let yvalues; // Using an array to store height values for the wave
  let backvalues;
  let back = 2 // back offset

  p.setup = () => {
    canvas = p.createCanvas(600, 300);
    w = p.width + 16;
    dx = (2*Math.PI / period) * xspacing;
    yvalues = new Array(p.floor(w / xspacing));
    backvalues = new Array(p.floor(w / xspacing));
  }
  p.draw = () => {
    p.background('blue');
    p.calcWave();
    p.renderWave();
    p.backWave();
  }

  p.calcWave= () =>  {
    // Increment theta (try different values for
    // 'angular velocity' here)
    theta += 0.02;

    // For every x value, calculate a y value with sine function
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {

      yvalues[i] = Math.sin(x) * amplitude;
      backvalues[i] = Math.sin(x+back) * amplitude;
      x += dx;
    }
  }
  p.renderWave = () => {
    p.noStroke();
    p.fill(37, 207, 122);
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < yvalues.length; x++) {
      var waveHeight = 4*p.height / 8 + yvalues[x]
      p.ellipse((x) * xspacing, p.height, 64,waveHeight);

    }
  }
  p.backWave = () => {
    p.noStroke();
    p.fill(19, 149, 244);
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < backvalues.length; x++) {
      var waveHeight = 4*p.height / 8 + backvalues[x]
      p.ellipse((x) * xspacing, p.height, 64,waveHeight);

    }
  }
}
