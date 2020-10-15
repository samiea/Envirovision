import { drawSun } from './sun';

const noiseSpeed = 0.01;
const noiseHeight = 20;
const num_clouds = 3;
const num_bubbles = 30;
const smogWidth = 40;
const smogHeight = 20;
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
let bubbles = [];
let smogClouds = [];

export function setupLandscape(p) {
    for (let i = 0; i < 3; i++) { // initialize the clouds
        clouds[i] = new Cloud(p, num_clouds - i);
    }

    for (let i = 0; i < 30; i++) { // initialize the bubbles
        bubbles[i] = new Bubble(p,
            p.random(0, p.width),
            p.random(-1.5, -1),
            p.random(10, 30)
        );
    }
    for(let i = 0; i < 4; i++ ) {
        smogClouds[i] = new SmogCloud(p);
    }

    noiseY = (p.height * 3) / 4; // y-noise for waves
};


export function drawLandscape(p, temperatureData, currentDate) { // this loops everything inside body
  
    makeClouds();
    makeWaves(p);
    p.noStroke();
    makeBubbles();
    makeSmog();
}

function makeClouds() { // create the clouds and call their moethods
    for (var i = 0; i < num_clouds; i++) {
        clouds[i].move();
        clouds[i].display();
    }
}

function makeSmog() {
    for (var i = 0; i < smogClouds.length; i++) {
        smogClouds[i].move();
        smogClouds[i].display();
    }
}

function makeBubbles() { // create the bubbles and call their methods
    for (let i = 0; i < num_bubbles; i++) {
        bubbles[i].move();
        bubbles[i].display();
    }
}

function makeWaves(p) { // create the waves
    createWave(0, { r: 194, g: 247, b: 254 });
    createWave(65, { r: 84, g: 182, b: 282 });
    createWave(80, { r: 112, g: 219, b: 245 });

    function createWave(offsetY, rgb) {
        p.noFill();
        p.stroke(rgb.r, rgb.g, rgb.b); // draw wave
        p.strokeWeight(p.height / 2);
        p.beginShape(); // create shape for area under waves
        p.curveVertex(0, p.height / 2);
        for (let i = 0; i < p.width; i += 50) {
            let y =
                p.noise(p.frameCount * noiseSpeed + i) * noiseHeight +
                noiseY +
                offsetY; // redraw y-coordinates for waves
            p.curveVertex(i, y);
        }
        p.curveVertex(p.width, p.height / 2);
        p.endShape(p.LINES); // end shape for area under waves
    }
}

function Bubble(p, xstart, yspeed, size) { // class for bubble objects
    this.x = xstart; // starting x-position of bubbles
    this.y = p.random(p.height, p.height * 1.5); // starting y-position of bubbles under height
    this.degree = 0;
    this.display = function () {
        p.fill(255, 255, 255, 50);
        p.ellipse(this.x, this.y, size);
        p.fill(255, 255, 255, 180);
        p.ellipse(this.x + 0.2 * size, this.y - 0.2 * size, 0.2 * size);
    };

    this.move = function () {
        this.y += yspeed; // bubble movement speed
        if (this.y < p.height * 0.63) {
            this.y = p.height * 1.2;
        }
        this.x += p.cos(p.radians(this.degree)); // base x-shifts on cosine waves
        this.degree += p.random(0.0, 1.0);
    };
}

function SmogCloud(p) {
    this.xVelocity = p.random(-2, 2); //cloud movement velocity
    this.x = p.random(50, p.width); 
    this.y = p.random(50, 200);
    this.width = p.random(100, 300);
    this.height = p.random(50, 100);
    this.smogBubbles = [];
    this.opacity = p.random(50,200);
    for(let x = 0; x < 25; x++) {
        this.smogBubbles[x] = new SmogBubble(p, this.width, this.height);
    }

    this.display = function() {
        console.log("Displaying smog cloud");
        p.noStroke();
        let cloudColor = p.color(100);
        cloudColor.setAlpha(this.opacity);
        p.fill(cloudColor);
        p.ellipse(this.x, this.y, this.width, this.height);
        p.beginShape();
        for(let x = 0; x < this.smogBubbles.length; x++) {
            cloudColor.setAlpha(this.smogBubbles[x].opacity);
            p.fill(cloudColor);
            p.ellipse(
                this.x + this.smogBubbles[x].xOffset,
                this.y + this.smogBubbles[x].yOffset,
                this.smogBubbles[x].rx,
                this.smogBubbles[x].ry
            );
            p.curveVertex(
                this.x + this.smogBubbles[x].xOffset,
                this.y + this.smogBubbles[x].yOffset
            );
        }
        
        p.endShape(p.CLOSE);
    }

    this.move = function() {
        
        for(let x = 0; x < this.smogBubbles.length; x++) {
            if(Math.abs(this.smogBubbles[x].xOffset) > this.width/2 - 10) {
                this.smogBubbles[x].xVelocity *= -1;
            }
            if(Math.abs(this.smogBubbles[x].yOffset) > this.height/2 - 10) {
                this.smogBubbles[x].yVelocity *= -1;
            }
            if(this.smogBubbles[x].rx < 70 || this.smogBubbles[x].rx > 150) {
                this.smogBubbles[x].rxVelocity *= -1;
            }
            if(this.smogBubbles[x].ry < 70 || this.smogBubbles[x].ry > 150) {
                this.smogBubbles[x].ryVelocity *= -1;
            }

            this.smogBubbles[x].xOffset += this.smogBubbles[x].xVelocity;
            this.smogBubbles[x].yOffset += this.smogBubbles[x].yVelocity;

            this.smogBubbles[x].rx += this.smogBubbles[x].rxVelocity;
            this.smogBubbles[x].ry += this.smogBubbles[x].ryVelocity;    
        }

        if(this.x > p.width) {
            this.x = 50;
        }
        else if(this.x < 0) {
            this.x = p.width-50;
        }
        this.x += this.xVelocity;
    }
     
}

function SmogBubble(p, xlimit, ylimit) {
    this.opacity = p.random(50,200);
    this.xVelocity = p.random(0.03, 0.07);
    this.yVelocity = p.random(0.03, 0.07);
    this.xOffset = p.random((xlimit/2)*(-1), xlimit/2);
    this.yOffset = p.random((ylimit/2)*(-1), ylimit/2);
    this.rx = p.random(70, 150);
    this.ry = p.random(70, 150);

    this.rxVelocity = p.random(0.01, 0.01);
    this.ryVelocity = p.random(0.01, 0.02);
}

function Cloud(p, key) { // class for cloud objects
    this.x = (p.width - 1200 * key); // initial x position
    this.y = p.height / 2 - 15; // initial y position

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
    };
}
