//these are gonna be the variables for our garbage collection
var drops = [];

var micro_Size = 5;

class Drop {
    constructor(p) {
        this.x = p.random(0, p.width);
        this.y = p.random(p.height / 2, p.height);
    }

    show(p) {
        p.noStroke();
        p.fill(255);
        p.ellipse(
            this.x,
            this.y,
            p.random(5, micro_Size),
            p.random(5, micro_Size)
        );
    }
    update(p) {
        this.speed = this.speed = p.random(2, 4);
        this.gravity = 1.05;
        this.y = this.y + this.speed * this.gravity;

        if (this.y > p.height) {
            this.y = p.height / 2;
            this.gravity = 0;
        }
    }
}

export function setupDrops(p, microGrowth2050) {
    //
    //set up plastic
    //
    for (var i = 0; i < 200; i++) {
        drops[i] = new Drop(p);
    }
}

export function drawDots(p, microGrowth2050, current_date) {
    //calc microplastic
    //
    var currentDate = current_date.getFullYear();
    //p.background(230, 230, 250);
    //console.log(microGrowth2050);
    //console.log(current_date);

    for (var i = 0; i < drops.length; i++) {
        drops[i].update(p);
        drops[i].show(p);
    }
    if (microGrowth2050 != null) {
        micro_Size =
            (-1 * (microGrowth2050[(currentDate - 2000) * 5][1] - 367)) / 10;
    }
}
