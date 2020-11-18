import { hoveredMacroPlasticData } from "./macroPlastics";

//these are gonna be the variables for our garbage collection
var drops = [];
var micro_Size = 5;
let newHeight = 0;
export let hoveredMicroPlasticData = { mouseOver: false, value: null };
// let hoveredMicroPlastic = null;

class Drop {
    constructor(p) {
        this.START_HEIGHT = p.height * 0.56;
        this.x = p.random(0, p.width);
        this.y = p.random(this.START_HEIGHT, p.height);

    }

    show(p) {
        p.noStroke();
        p.fill(255);
        this.size = p.random(5, micro_Size)

        p.ellipse(
            this.x,
            this.y,
            this.size
        );

        if (hoveredMacroPlasticData.mouseOver) {
            p.fill(225, 225, 0, 70)
            p.ellipse(this.x, this.y, this.size + 10);
        }
    }

    update(p) {
        this.speed = this.speed = p.random(2, 4);
        this.gravity = 1.05;
        this.y = this.y + this.speed * this.gravity;

        if (this.y > p.height) {
            this.y = this.START_HEIGHT-newHeight;
            this.gravity = 0;
        }

        // if (p.mouseIsPressed && p.dist(p.mouseX, p.mouseY, this.x, this.y) < this.size+5) {
        //     hoveredMicroPlasticData.mouseOver = true;
        //     hoveredMicroPlastic = this;

        // }
    }
}

export function setupMicroPlasticDrops(p) {
    //
    //set up plastic
    //
    for (var i = 0; i < 200; i++) {
        drops[i] = new Drop(p);
    }
}

export function drawMicroPlasticDots(p, microGrowth2050, current_date, seaLevelRise) {
  //we wil add a new height to the starting height to make our landscape rise and fall
  // with the date and sea seaLevelRise data

  var currentDate = current_date.getFullYear();
  var index = currentDate - 1880;

  if (index<0){
    newHeight = 0
  }
  if (currentDate>2013)
  {
    newHeight = seaLevelRise[(2013-1880)][1]*3+((currentDate-2014))/3
  }
  else{
    newHeight = seaLevelRise[index][1]*3
  }


    //calc microplastic
    //

    for (var i = 0; i < drops.length; i++) {

      if (!hoveredMacroPlasticData.mouseOver) {
        drops[i].update(p);
      }
    //   else if (p.dist(p.mouseX, p.mouseY, hoveredMicroPlastic.x, hoveredMicroPlastic.y) > hoveredMicroPlastic.size+5) {
    //       hoveredMicroPlasticData.mouseOver = false;
    //   }
        drops[i].show(p);

    }

    if (microGrowth2050 != null) {

        var newSize = -1 * (microGrowth2050[currentDate - 1950][1] - 367);

        if (currentDate>1971){
          var num = newSize*(590000/78)
          hoveredMicroPlasticData.value = num.toFixed(2)
        }
        else {
          var num = (currentDate - 1950)*100
          hoveredMicroPlasticData.value = num.toFixed(2)
        }

        //console.log(newSize*(590000/78));
        newSize = newSize * 2 + 200;
        //add drops


        if (newSize > drops.length) {
            for (var j = drops.length; j < newSize; j++) {
                drops[j] = new Drop(p);
            }
        }
        //remove drops
        if (newSize < drops.length) {
            var diff = drops.length - newSize;
            drops = drops.splice(diff);
        }
    }
}
