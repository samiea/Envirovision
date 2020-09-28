
//var color ;


export default function sketch(p) {
    let canvas;
    var temp_array = 0;
    p.setup = () => {
        canvas = p.createCanvas(600, 300);
        p.noStroke();
    }

    p.draw = () => {
        //console.log('draw');
        //console.log(this);
        p.background('blue');
        p.ellipse(p.width, 0, temp_array.length/10, temp_array.length/10);
        p.fill('yellow')
        //p.fill(color)
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
      if(canvas){ //Make sure the canvas has been created
        console.log('customProp');
        console.log(newProps.tempArray);
        temp_array = newProps.tempArray.tempData
      }
        //color = newProps.color
        //co2Length = newProps.co2Length
        //console.log(this);
        //console.log(newProps);
      }

}
