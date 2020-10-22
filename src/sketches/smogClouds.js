let smogClouds = [];

class SmogCloud {
    constructor(p) {
        this.xVelocity = p.random(-2, 2); //cloud movement velocity
        this.x = p.random(50, p.width);
        this.y = p.random(50, 200);
        this.width = p.random(100, 300);
        this.height = p.random(50, 100);
        this.smogBubbles = [];
        this.opacity = p.random(50, 200);
        
        for (let x = 0; x < 25; x++) {
            this.smogBubbles[x] = new SmogBubble(p, this.width, this.height);
        }

        this.display = function () {
            // console.log("Displaying smog cloud");
            p.noStroke();
            let cloudColor = p.color(100);
            cloudColor.setAlpha(this.opacity);
            p.fill(cloudColor);
            p.ellipse(this.x, this.y, this.width, this.height);
            p.beginShape();
            for (let x = 0; x < this.smogBubbles.length; x++) {
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
        };

        this.move = function () {
            for (let x = 0; x < this.smogBubbles.length; x++) {
                if (Math.abs(this.smogBubbles[x].xOffset) > this.width / 2 - 10) {
                    this.smogBubbles[x].xVelocity *= -1;
                }
                if (Math.abs(this.smogBubbles[x].yOffset) > this.height / 2 - 10) {
                    this.smogBubbles[x].yVelocity *= -1;
                }
                if (this.smogBubbles[x].rx < 70 || this.smogBubbles[x].rx > 150) {
                    this.smogBubbles[x].rxVelocity *= -1;
                }
                if (this.smogBubbles[x].ry < 70 || this.smogBubbles[x].ry > 150) {
                    this.smogBubbles[x].ryVelocity *= -1;
                }

                this.smogBubbles[x].xOffset += this.smogBubbles[x].xVelocity;
                this.smogBubbles[x].yOffset += this.smogBubbles[x].yVelocity;

                this.smogBubbles[x].rx += this.smogBubbles[x].rxVelocity;
                this.smogBubbles[x].ry += this.smogBubbles[x].ryVelocity;
            }

            if (this.x > p.width) {
                this.x = 50;
            } else if (this.x < 0) {
                this.x = p.width - 50;
            }
            this.x += this.xVelocity;
        };
    }
}

class SmogBubble {
    constructor(p, xlimit, ylimit) {
        this.opacity = p.random(50, 200);
        this.xVelocity = p.random(0.03, 0.07);
        this.yVelocity = p.random(0.03, 0.07);
        this.xOffset = p.random((xlimit / 2) * -1, xlimit / 2);
        this.yOffset = p.random((ylimit / 2) * -1, ylimit / 2);
        this.rx = p.random(70, 150);
        this.ry = p.random(70, 150);

        this.rxVelocity = p.random(0.01, 0.01);
        this.ryVelocity = p.random(0.01, 0.02);
    }
}

export function setupSmogClouds(p) {
    for (let i = 0; i < 4; i++) {
        smogClouds[i] = new SmogCloud(p);
    }
}

export function drawSmogClouds(p) {
    for (var i = 0; i < smogClouds.length; i++) {
        smogClouds[i].move();
        smogClouds[i].display();
    }
}
