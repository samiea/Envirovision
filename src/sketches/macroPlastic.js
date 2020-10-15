
let canvas;
//these are gonna be the variables for our garbage collection
var macro_plastic = []
var macro_Size = 20;

var const_start_height = 700

class Plastic{


    constructor(p,index){
      var ending_height = const_start_height - index/15
      var starting_height = const_start_height + index/15
      var width = const_start_height+ index/10
      this.x = p.random(width, p.width);
      this.y = p.random(const_start_height, ending_height );
      this.color = p.random(0,255);
      this.size = p.random(12,20)
    }


    show(p) {
      p.noStroke();
      p.fill(this.color);
      p.ellipse(this.x, this.y, this.size, this.size);
    }

  }

export function setupPlastic(p,macroGrowth2050)  {

  //
  //set up plastic
  //
    for(var i = 0; i < 200; i++) {
        macro_plastic[i] = new Plastic(p,i);
    }
  }

export function drawPlastic(p,macroGrowth2050,current_date) {
  //calc microplastic
  //
  var currentDate = current_date.getFullYear()
  //p.background(230, 230, 250);
  //console.log(microGrowth2050);
  //console.log(current_date);

  for (var i = 0; i < macro_plastic.length; i++) {
    macro_plastic[i].show(p);
  }

  if (macroGrowth2050 != null){



     var newSize = -1*(macroGrowth2050[(currentDate -1950)][1]-367)
     newSize = newSize *5 +200
     console.log(newSize);
     //add drops
     if (newSize>macro_plastic.length){
       for (var i = macro_plastic.length; i<newSize; i++){
         macro_plastic[i] = new Plastic(p,i);
       }

     }
     //remove drops
     if (newSize<macro_plastic.length){
       var diffrenece = macro_plastic.length-newSize
       macro_plastic = macro_plastic.splice(0, diffrenece);

     }
  }



}
