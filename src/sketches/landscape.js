const noiseSpeed = 0.01;
const noiseHeight = 20;
const num_clouds = 3;
const cloud_ellipses = [
    { x: 0, y: 20, rx: 70, ry: 40 },
    { x: 25, y: -3, rx: 50, ry: 28 },
    { x: 70, y: 3, rx: 50, ry: 28 },
    { x: 100, y: 5, rx: 24, ry: 24 },
    { x: 115, y: -2, rx: 24, ry: 24 },
    { x: 130, y: -2, rx: 24, ry: 24 },
    { x: 145, y: 0, rx: 24, ry: 24 },
    { x: 160, y: 5, rx: 24, ry: 24 },
    { x: 173, y: 5, rx: 24, ry: 24 },
    { x: 185, y: 5, rx: 24, ry: 24 },
    { x: 198, y: -3, rx: 24, ry: 24 },
    { x: 215, y: 3, rx: 28, ry: 24 },
    { x: 230, y: 4, rx: 30, ry: 24 },
    { x: 245, y: 6, rx: 30, ry: 24 },
    { x: 260, y: 6, rx: 30, ry: 24 },
    { x: 270, y: 3, rx: 26, ry: 24 },
    { x: 285, y: 10, rx: 30, ry: 24 },
    { x: 310, y: 4, rx: 30, ry: 24 },
    { x: 325, y: 4, rx: 16, ry: 16 },
    { x: 339, y: 2, rx: 24, ry: 24 },
    { x: 365, y: 5, rx: 44, ry: 28 },
    { x: 400, y: 0, rx: 40, ry: 24 },
    { x: 435, y: -5, rx: 50, ry: 30 },
    { x: 465, y: 5, rx: 24, ry: 24 },
    { x: 490, y: -3, rx: 38, ry: 30 },
    { x: 524, y: -3, rx: 40, ry: 24 },
    { x: 550, y: -10, rx: 60, ry: 50 },
    { x: 595, y: 3, rx: 58, ry: 40 },
    { x: 627, y: 12, rx: 24, ry: 24 },
    { x: 643, y: 20, rx: 40, ry: 24 },
    { x: 665, y: 19, rx: 30, ry: 24 },
    { x: 695, y: 20, rx: 50, ry: 24 },
    { x: 715, y: 25, rx: 45, ry: 30 },
    { x: 740, y: 25, rx: 45, ry: 30 },
    { x: 754, y: 17, rx: 27, ry: 24 },
    { x: 766, y: 17, rx: 20, ry: 20 },
    { x: 780, y: 17, rx: 25, ry: 20 },
    { x: 800, y: 10, rx: 30, ry: 20 },
    { x: 820, y: 10, rx: 40, ry: 40 },
    { x: 860, y: 10, rx: 80, ry: 60 },
    { x: 890, y: -5, rx: 24, ry: 24 },
    { x: 910, y: -10, rx: 40, ry: 40 },
    { x: 950, y: -18, rx: 69, ry: 50 },
    { x: 990, y: -18, rx: 40, ry: 30 },
    { x: 1010, y: 0, rx: 40, ry: 30 },
    { x: 1030, y: 10, rx: 24, ry: 24 },
    { x: 1050, y: 8, rx: 24, ry: 24 },
    { x: 1065, y: 10, rx: 24, ry: 24 },
    { x: 1090, y: 15, rx: 50, ry: 24 },
    { x: 1115, y: 20, rx: 24, ry: 24 },
    { x: 1135, y: 25, rx: 40, ry: 24 },
    { x: 1155, y: 25, rx: 40, ry: 24 },
    { x: 1180, y: 20, rx: 38, ry: 25 },
    { x: 1200, y: 100, rx: 70, ry: 40 },
];
let noiseY;
let clouds = [];
//new height to add to the height of the wave to indicate see level rise
let newHeight = 0;

export function setupLandscape(p) {
    for (let i = 0; i < 3; i++) { // initialize the clouds
        clouds[i] = new Cloud(p, num_clouds - i);
    }

    noiseY = (p.height * 3) / 4; // y-noise for waves
};


export function drawLandscape(p,currentDate,seaLevelRise) { // this loops everything inside body
    //we wil add a new height to the starting height to make our landscape rise and fall
    // with the date and sea seaLevelRise data

    var currentYear = currentDate.getFullYear();
    var index = currentYear - 1880;

    if (index<0){
      newHeight = 0
    }
    if (currentYear>2013)
    {
      newHeight = seaLevelRise[(2013-1880)][1]*3+((currentYear-2014))/3
    }
    else{
      newHeight = seaLevelRise[index][1]*3
    }


    drawClouds();
    drawWaves(p,currentDate);
    p.noStroke();
}

function drawClouds() { // create the clouds and call their moethods
    for (var i = 0; i < num_clouds; i++) {
        clouds[i].move();
        clouds[i].display();
    }
}

function drawWaves(p,currentDate) { // create the waves

    var startColor = { r: 194, g: 247, b: 254 }
    var endColor = {r: 116, g:199, b:145 }
    var color = calcWaveColor(p,currentDate, startColor,endColor)
    createWave(p, (0 - newHeight), color , 2);

    var startColor = { r: 84, g: 182, b: 282 }
    var endColor = {r: 109, g:163, b:103 }
    var color = calcWaveColor(p,currentDate,startColor,endColor)
    createWave(p, (65 - newHeight), color, 2);

    var startColor = { r: 112, g: 219, b: 245 }
    var endColor = {r: 50, g:189, b:34 }
    var color = calcWaveColor(p,currentDate,startColor,endColor)
    createWave(p, (80 - newHeight), color, 2);
}

export function drawSeaboard(p) { // create the landscape
    createWave(p, (180), { r: 250, g: 219, b: 97 }, 1);
}

/**
 * Create wave
 *
 * @param {*} offsetY Vertical offset of wave
 * @param {*} rgb Wave color
 * @param {*} dim Dimension (1D or 2D)
 */
function createWave(p, offsetY, rgb, dim) {
    p.noFill();
    p.stroke(rgb.r, rgb.g, rgb.b); // draw wave
    p.strokeWeight(p.height / 2);
    p.beginShape(); // create shape for area under waves
    p.curveVertex(0, p.height / 2);
    for (let i = 0; i < p.width; i += 50) {
        let y =
            dim === 1 ?
            p.map(p.noise(i), 0, 1, 200, 300) + noiseY + offsetY :
                p.noise(p.frameCount * noiseSpeed + i) * noiseHeight +
                noiseY +
                offsetY; // redraw y-coordinates for waves
        p.curveVertex(i, y);
    }
    p.curveVertex(p.width, p.height / 2);
    p.endShape(p.LINES); // end shape for area under waves
}

class Cloud { // class for cloud objects
    constructor(p, key) {
        this.x = (p.width - 1200 * key); // initial x position
        this.y = (p.height / 2 - 15); // initial y position

        this.display = function () {
            p.stroke(255); // white stroke
            p.strokeWeight(1);
            p.fill(255);
            p.beginShape(); // create shape for area under ellipses
            for (let i = 0; i < cloud_ellipses.length; i++) {
                p.ellipse( // create ellipses that form clouds
                    this.x + cloud_ellipses[i].x,
                    this.y + cloud_ellipses[i].y,
                    cloud_ellipses[i].rx,
                    cloud_ellipses[i].ry
                );
                p.curveVertex( // create vertices to paint area under cloud white
                    this.x + cloud_ellipses[i].x,
                    this.y + cloud_ellipses[i].y
                );
            }
            p.curveVertex(p.width, p.height);
            p.endShape(p.CLOSE); // end shape for area under ellipses
        };

        this.move = function () {
            this.x += 0.2; // cloud movement speed

            if (this.x >= p.width) {
                this.x = p.width - 1200 * num_clouds; // reset cloud to this position
            }

            this.y = (p.height / 2 - 15) - newHeight ; // update Yposition
        };
    }
}

export function calcWaveColor(p, currentDate ,startColor, endColor) {

    //return endColor

    var currentYear = currentDate.getFullYear();
    //underData
    var yearIdex = currentYear - 1950;
    //constants for changing color

    var color_2010_r = startColor.r*0.75
    var color_2010_g = startColor.g*0.75
    var color_2010_b = startColor.b*0.75

    var rGap = (color_2010_r-endColor.r)/ 70;
    var gGap = (color_2010_g-endColor.g)/ 70;
    var bGap = (color_2010_b-endColor.b)/ 70;

    //no data yet
    if (currentYear < 2010) {

           // code body moved outside (above) statement block
           var rIndex = startColor.r - ((rGap * yearIdex) | 0);
           var gIndex = startColor.g - ((gGap * yearIdex) | 0);
           var bIndex = startColor.b - ((bGap * yearIdex) | 0);

           return {r:rIndex, g:gIndex, b:bIndex}
    }

    return endColor
    /*
    //first index is 0 =, year 2010, trend 387
    //last index is 3900, year 2020, trend 412
    else if (currentYear!=2020) {

        //initial colors
        var rIndex = START_SKY_r -  ((rGap * 60) | 0);
        var gIndex = START_SKY_g - ((gGap * 60) | 0);
        var bIndex = START_SKY_g - ((bGap * 60) | 0);

        //find new jump of index
        var rJump = (rIndex - END_SKY_r)/(412-387)
        var gJump = (gIndex - END_SKY_g)/(412-387)
        var bJump = (bIndex - END_SKY_b)/(412-387)
        //there are 10 year in the carbon data
        //get the index gap of carbon data
        var yearGap = 390;
        var monthGap = yearGap / 12;
        var year_index = currentYear - 2010;
        var month_index = currentDate.getMonth()-1;

        var current_index = yearGap * year_index + month_index * monthGap;
        current_index = current_index | 0;

        // var average = 0;
        //console.log(carbonData);
        var carbon = (carbonData[current_index].trend-387)
        rIndex = rIndex-carbon*rJump
        gIndex = gIndex-carbon*gJump
        bIndex = bIndex-carbon*bJump

        p.background(rIndex, gIndex, bIndex);
    }
    else{
        p.background(15,26,155)
    }
    */
}
