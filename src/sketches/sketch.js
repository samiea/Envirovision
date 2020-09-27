export default function sketch(p) {
    let canvas;
    let carbon;
    let color;

    p.setup = () => {
        canvas = p.createCanvas(600, 600);
        p.noStroke();
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        if (props.carbon !== null) {
            carbon = props.carbon;
            console.log(carbon);
            color = 'green';
        }
        else {
            carbon = "No data";
            color = 'red';
        }
    }

    p.draw = () => {
        p.background(color);
        //if (carbon !== undefined) {
          //p.ellipse(p.mouseX, p.mouseY, Number(carbon.co2[0].trend), Number(carbon.co2[0].trend));
        //}
        //p.textSize(32);
        //p.textAlign(p.CENTER);
        //p.text(carbon, 300, 300);
    }
}
