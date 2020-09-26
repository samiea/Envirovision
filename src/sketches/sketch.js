export default function sketch(p) {
    let canvas;

    p.setup = () => {
        canvas = p.createCanvas(600, 600);
        p.noStroke();
    }

    p.draw = () => {
        p.background('orangered');
        p.ellipse(p.mouseX, p.mouseY, 100, 100);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        if (canvas) {
            p.fill(newProps.color);
        }
    }
}
