//these are gonna be the variables for our garbage collection
var macro_plastic = [];

class Plastic {
    constructor(p, index) {
        this.START_HEIGHT = p.height * 0.56;
        var ending_height = this.START_HEIGHT - index / 15;
        // var width = this.START_HEIGHT + index / 10;
        this.x = p.random(/*width*/ 0, p.width);
        this.y = p.random(this.START_HEIGHT, ending_height);
        this.color = p.random(0, 255);
        this.size = p.random(12, 20);
    }

    show(p) {
        p.noStroke();
        p.fill(this.color);
        p.ellipse(this.x, this.y, this.size, this.size);
    }
}

export function setupMacroPlastics(p) {
    //
    //set up plastic
    //
    for (var i = 0; i < 200; i++) {
        macro_plastic[i] = new Plastic(p, i);
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
        macro_plastic[i].show(p);
    }

    if (macroGrowth2050 != null) {
        var newSize = -1 * (macroGrowth2050[currentDate - 1950][1] - 367);
        newSize = newSize * 5 + 200;
        // console.log(newSize);
        //add drops
        if (newSize > macro_plastic.length) {
            for (var j = macro_plastic.length; j < newSize; j++) {
                macro_plastic[j] = new Plastic(p, j);
            }
        }
        //remove drops
        if (newSize < macro_plastic.length) {
            var diff = macro_plastic.length - newSize;
            macro_plastic = macro_plastic.splice(0, diff);
        }
    }
}
