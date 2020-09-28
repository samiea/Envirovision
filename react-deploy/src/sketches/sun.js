
//var color ;


export default function sketch(p) {
    let canvas;
    var co2_array = 0;
    p.setup = () => {
        canvas = p.createCanvas(600, 300);
        p.noStroke();
    }

    p.draw = () => {
        //console.log('draw');
        //console.log(this);
        p.background('blue');
        p.ellipse(p.width, 0, co2_array.length/10, co2_array.length/10);
        p.fill('yellow')
        //p.fill(color)
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
      if(canvas){ //Make sure the canvas has been created
        console.log('customProp');
        console.log(newProps.co2Array.carbonData);
        co2_array = newProps.co2Array.carbonData
      }
        //color = newProps.color
        //co2Length = newProps.co2Length
        //console.log(this);
        //console.log(newProps);
      }

}
