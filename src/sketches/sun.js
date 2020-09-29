//var color ;


export default function sketch(p) {
    let canvas;
    var temp_array = null;

    p.setup = () => {
        canvas = p.createCanvas(600, 300);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
      if(canvas){ //Make sure the canvas has been created
        temp_array = newProps.tempArray;
        console.log("In sketch: ");
        console.log(temp_array);
      }
    }

    p.draw = () => {
    }
}
