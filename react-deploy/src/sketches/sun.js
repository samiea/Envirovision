
//var color ;


export default function sketch(p) {
    let canvas;
    var temp_array = null;
    var yvalues;
    var size_index=0;


    p.setup = () => {
        canvas = p.createCanvas(600, 300);
        p.noStroke();
        yvalues = new Array(p.floor(200));

    }

    p.draw = () => {
        //console.log('draw');
        //console.log(this);
        p.background('blue');
        p.calcSun();
        p.changeY();
        p.drawSun();
        //p.fill(color)
        //console.log(temp_array);
    }
    p.calcSun= () => {

      //console.log(temp_array)
      if (temp_array != null){
        for (let i = 0; i < (temp_array.length/8); i++) {
          //console.log(typeof parseFloat(temp_array[i*8].land));
          var average = parseFloat(temp_array[i*8].station)// + parseFloat(temp_array[i*8].land))/2);
          //console.log(typeof average);
          yvalues[i] = average+1;
          //console.log(average);
        }
        //console.log(typeof temp_array[200]);
      }
    }
    p.changeY= () => {
      if (size_index == yvalues.length)
        size_index = 0;

      size_index+=1
    }
    p.drawSun= () => {
      if (temp_array != null){
        //console.log('here');
        //console.log(yvalues);

          //console.log(yvalues);
          p.ellipse(p.width, 0, yvalues[size_index]*50, yvalues[size_index]*50);
          p.fill('yellow')

      }
    }
    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
      if(canvas){ //Make sure the canvas has been created
        //console.log('customProp');
        //console.log(newProps.tempArray);
        temp_array = newProps.tempArray.tempData
        //console.log(newProps.tempArray.tempData);

      }

    }



}
