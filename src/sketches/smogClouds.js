let smogClouds = [];
let originalData = null;
const initial_clouds = 4;
let extra_clouds = 0;

class SmogCloud {
    constructor(p) {
        this.todayData = null;

        this.xVelocity = p.random(-2, 2); //cloud movement velocity
        this.x = p.random(50, p.width);
        this.y = p.random(50, 200);
        this.width = p.random(100, 300);
        this.height = p.random(50, 100);
        this.smogBubbles = [];
        this.opacity = p.random(50, 200);
        this.addlimit = 0;
        
        for (let x = 0; x < 25; x++) {
            this.smogBubbles[x] = new SmogBubble(p, this.width, this.height);
        }

        this.display = function (todayData) {
            this.oldData = this.todayData
            this.todayData = todayData;
            if(this.todayData == undefined) {
                this.todayData = this.oldData;
            }
            // console.log("Displaying smog cloud");

            if(this.oldData != undefined) {
                p.noStroke();
                let cloudColor = p.color(100);
                cloudColor.setAlpha(this.opacity);
                p.fill(cloudColor);

                this.width += (parseFloat(this.todayData.average) - parseFloat(this.oldData.average))* 10
                this.height += (parseFloat(this.todayData.average) - parseFloat(this.oldData.average))* 10

                p.ellipse(this.x, this.y, this.width, this.height);
                p.beginShape();
                for (let x = 0; x < this.smogBubbles.length; x++) {
                    cloudColor.setAlpha(this.smogBubbles[x].opacity);
                    p.fill(cloudColor);
                    this.smogBubbles[x].rx += (this.todayData.average - this.oldData.average)* 10
                    this.smogBubbles[x].ry += (this.todayData.average - this.oldData.average)* 10

                    //this.smogBubbles[x].rxVelocity += (this.todayData.average - this.oldData.average)
                    //this.smogBubbles[x].ryVelocity += (this.todayData.average - this.oldData.average) 

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
            }
            p.endShape(p.CLOSE);
        };

        this.move = function () {
            if(this.oldData != undefined) {
                this.addlimit += (parseFloat(this.todayData.average) - parseFloat(this.oldData.average))* 10;
                for (let x = 0; x < this.smogBubbles.length; x++) {
                    if (Math.abs(this.smogBubbles[x].xOffset) > this.width / 2 - 10 + this.addLimit) {
                        this.smogBubbles[x].xVelocity *= -1;
                    }
                    if (Math.abs(this.smogBubbles[x].yOffset) > this.height / 2 - 10 + this.addLimit) {
                        this.smogBubbles[x].yVelocity *= -1;
                    }
                    if (this.smogBubbles[x].rx < 70 + this.addlimit || this.smogBubbles[x].rx > 150 + this.addlimit) {
                        this.smogBubbles[x].rxVelocity *= -1;
                    }
                    if (this.smogBubbles[x].ry < 70 + this.addlimit || this.smogBubbles[x].ry > 150 + this.addlimit) {
                        this.smogBubbles[x].ryVelocity *= -1;
                    }

                    this.smogBubbles[x].xOffset += this.smogBubbles[x].xVelocity;
                    this.smogBubbles[x].yOffset += this.smogBubbles[x].yVelocity;

                    this.smogBubbles[x].rx += this.smogBubbles[x].rxVelocity;
                    this.smogBubbles[x].ry += this.smogBubbles[x].ryVelocity;
                }
            }
            if (this.x > p.width + 50) {
                this.x = -50;
            } else if (this.x < -50) {
                this.x = p.width - 100;
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

        this.rxVelocity = p.random(0.1, 0.5);
        this.ryVelocity = p.random(0.1, 0.5);
    }
}

export function setupSmogClouds(p, nitrousData, currentDate) {
    for (let i = 0; i < initial_clouds; i++) {
        smogClouds[i] = new SmogCloud(p, nitrousData, currentDate);
    }
    
}

export function drawSmogClouds(p, nitrousData, currentDate) {
        let currIndex = 33 + ((currentDate.getFullYear() - 2004) * 12) + currentDate.getMonth()

        if(originalData == null && nitrousData != null) {
            originalData = nitrousData[0];
        }
        else if(nitrousData != undefined && currIndex > 0 && currIndex < nitrousData.length) {
            let diff = Math.round(((nitrousData[currIndex].average - originalData.average)/10)) - extra_clouds;
            console.log(diff);

            if(diff > 0) {
                for(let x = 0 ; x < diff; x++) {
                    smogClouds[smogClouds.length] = new SmogCloud(p, nitrousData, currentDate);
                    extra_clouds++;
                }
            }
            else if(diff < 0) {
                let slice = smogClouds.length - 1 + diff;
                extra_clouds -= smogClouds.length - 1 - slice;
                smogClouds = smogClouds.slice(0, slice);
            }
        }

        if(currIndex >= 0) {
            for (var i = 0; i < smogClouds.length; i++) {
                smogClouds[i].move();
                smogClouds[i].display(nitrousData[currIndex]);
            }
        }
        else {
            for(var i = 0; i < smogClouds.length; i++) {
                smogClouds[i].move();
                smogClouds[i].display(nitrousData[0]);
            }
        }

    
}

//nitrousData[;
