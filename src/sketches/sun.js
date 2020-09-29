export default function sketch(p) {
    let canvas;
    var carbArray = null;

    p.setup = () => {
        canvas = p.createCanvas(600, 300);
        p.noStroke();
        p.fill(Number(carbArray[0].trend));
        console.log("In sketch: ");
        console.log(carbArray);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        carbArray = newProps.carbArray;
    }

    p.draw = () => {
        p.background(200, 200, 255);
        p.ellipse(200, 200, 50, 50);
    }
}
