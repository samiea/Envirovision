

export default function molecules(p) {
    let canvas;

    p.setup = () => {
        canvas = p.createCanvas(600, 300);
        p.noStroke();
        
    }
    p.draw = () => {
        for (var i = 0; i < 200; i++) {
            p.ellipse(p.random(0, 600), p.random(0, 300), 5);
        }
    }
}