
//these are gonna be the variables for our garbage collection
var macro_plastic = [];



class GarbagePile {
    constructor(p) {
        var bubbleHeight = p.height/2
        this.xVelocity = p.random(-2, 2); //cloud movement velocity
        this.x = p.random(50, p.width);
        this.y = bubbleHeight;
        this.width = p.random(100, 300);
        this.height = p.random(50, 100);
        this.garbageBubbles = [];
        this.opacity = p.random(400, 500);
        this.rcolor = p.random(129,160);
        this.gcolor = p.random(80,105);
        this.bcolor = p.random(70,110);

        for (let x = 0; x < 25; x++) {
            this.garbageBubbles[x] = new GarbageBubble(p, this.width, this.height);
        }

        this.display = function () {
            // console.log("Displaying smog cloud");
            p.noStroke();

            let color = p.color(this.rcolor,this.gcolor,this.bcolor);
            this.garbageColor = color
            this.garbageColor.setAlpha(this.opacity);
            p.fill(this.garbageColor)
            //p.ellipse(this.x, this.y, this.width, this.height);
            p.beginShape();
            for (let x = 0; x < this.garbageBubbles.length; x++) {

                p.ellipse(
                    this.x + this.garbageBubbles[x].xOffset,
                    this.y + this.garbageBubbles[x].yOffset,
                    this.garbageBubbles[x].rx,
                    this.garbageBubbles[x].ry
                );
                p.curveVertex(
                    this.x + this.garbageBubbles[x].xOffset,
                    this.y + this.garbageBubbles[x].yOffset
                );
            }

            p.endShape(p.CLOSE);
        };

        this.move = function () {
            for (let x = 0; x < this.garbageBubbles.length; x++) {
                if (Math.abs(this.garbageBubbles[x].xOffset) > this.width / 2 - 10) {
                    this.Bubbles[x].xVelocity *= -1;
                }
                if (Math.abs(this.garbageBubbles[x].yOffset) > this.height / 2 - 10) {
                    this.garbageBubbles[x].yVelocity *= -1;
                }
                if (this.garbageBubbles[x].rx < 70 || this.garbageBubbles[x].rx > 150) {
                    this.garbageBubbles[x].rxVelocity *= -1;
                }
                if (this.garbageBubbles[x].ry < 70 || this.garbageBubbles[x].ry > 150) {
                    this.garbageBubbles[x].ryVelocity *= -1;
                }

                this.garbageBubbles[x].xOffset += this.garbageBubbles[x].xVelocity;
                this.garbageBubbles[x].yOffset += this.garbageBubbles[x].yVelocity;

                this.garbageBubbles[x].rx += this.garbageBubbles[x].rxVelocity;
                this.garbageBubbles[x].ry += this.garbageBubbles[x].ryVelocity;
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

class GarbageBubble {
    constructor(p, xlimit, ylimit) {
        this.opacity = p.random(150, 200);
        this.xVelocity = p.random(0.03, 0.07);
        this.yVelocity = p.random(0.03, 0.07);
        this.xOffset = p.random((xlimit / 4) * -1, xlimit / 4);
        this.yOffset = p.random((ylimit / 8) * -1, ylimit / 8);
        this.rx = p.random(25, 40);
        this.ry = p.random(25, 40);

        this.rxVelocity = p.random(0.01, 0.01);
        this.ryVelocity = p.random(0.01, 0.02);


        //let color = p.color(rcolor,gcolor,bcolor);
        //this.garbageColor = color
        //this.garbageColor.setAlpha(this.opacity);
        //p.fill(this.garbageColor);
    }
}

/*export function setupSmogClouds(p) {
    for (let i = 0; i < 4; i++) {
        smogClouds[i] = new SmogCloud(p);
    }
}

export function drawSmogClouds(p) {
    for (var i = 0; i < smogClouds.length; i++) {
        smogClouds[i].move();
        smogClouds[i].display();
    }
}*/

/*class Plastic {
    constructor(p, index) {
        this.START_HEIGHT = p.height * 0.56;
        var ending_height = this.START_HEIGHT - index / 15;
        // var width = this.START_HEIGHT + index / 10;
        this.x = p.random(/*width*//* 0, p.width);
        this.y = p.random(this.START_HEIGHT, ending_height);
        this.color = p.random(0, 255);
        this.size = p.random(12, 20);
    }

    show(p) {
        p.noStroke();
        p.fill(this.color);
        p.ellipse(this.x, this.y, this.size, this.size);
        basicGarbage(this.x, this.y, this.size, this.size);
    }
}
*/
export function setupMacroPlastics(p) {
    //
    //set up plastic
    //
    for (var i = 0; i < 5; i++) {
        macro_plastic[i] = new GarbagePile(p, i);
    }
}

export function drawMacroPlastics(p, macroGrowth2050, current_date) {
    //calc microplastic
    //
    var currentDate = current_date.getFullYear();
    // console.log(currentDate);
    //p.background(230, 230, 250);
    //console.log(microGrowth2050);
    // console.log(current_date);

    for (var i = 0; i < macro_plastic.length; i++) {
        macro_plastic[i].display(p);
    }

    if (macroGrowth2050 != null) {
        var newSize = -1 * (macroGrowth2050[currentDate - 1950][1] - 367);

        newSize = (newSize/5)| + 5;

        // console.log(newSize);
        //add drops
        if (newSize > macro_plastic.length) {
            for (var j = macro_plastic.length; j < newSize; j++) {
                macro_plastic[j] = new GarbagePile(p);
            }
        }
        //remove drops
        if (newSize < macro_plastic.length) {
            //console.log('remove');
            var diff = macro_plastic.length - newSize;
            macro_plastic = macro_plastic.splice(0, diff);
        }
    }
}
