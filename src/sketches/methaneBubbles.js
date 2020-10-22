const INIT_NUM_BUBBLES = 30; // always starts with 30 bubbles
let bubbles = []; // holds Bubble objects

/**
 * Class for bubbles that float up from seabed on display
 */
class Bubble {
    /**
     * Constructor for bubbles
     * 
     * @param {*} p p5 ptr
     * @param {*} xstart Starting x-position
     * @param {*} yspeed Speed of bubble rising to top
     * @param {*} size Size of bubble
     */
    constructor(p, xstart, yspeed, size) { // class for bubble objects
        this.yspeed = yspeed;
        this.x = xstart; // starting x-position of bubbles
        this.y = p.random(p.height, p.height * 1.5); // starting y-position of bubbles under height
        this.degree = 0;

        /**
         * Display bubble on sketch
         */
        this.display = function () {
            p.fill(255, 255, 255, 50);
            p.ellipse(this.x, this.y, size);
            p.fill(255, 255, 255, 180);
            p.ellipse(this.x + 0.2 * size, this.y - 0.2 * size, 0.2 * size); // bubble detail
        };

        /**
         * Behavior for bubble movement
         */
        this.move = function () {
            this.x += p.cos(p.radians(this.degree)); // base x-shifts on cosine waves
            this.y += this.yspeed; // bubble movement speed
            if (this.y < p.height * 0.63) {
                this.y = p.height * 1.2;
            }
            this.degree += p.random(0.0, 1.0);
        };

        /**
         * Set bubble speed corresponding to data
         * 
         * @param {*} new_speed Re-initialize bubble speed
         */
        this.setSpeed = function (new_speed) {
            this.yspeed = new_speed;
        }
    }
}

/**
 * Set up methane bubbles on canvas
 * 
 * @param {*} p p5 ptr
 */
export function setupMethaneBubbles(p, methaneData) {
    // initialize at beginning with bubbles from starting date
    // const AVG_START = methaneData.arr[0].average;
    // const AVG_END = methaneData.arr[methaneData.arr.length - 1].average;
    // const AVG_DIFF = AVG_END - AVG_START; // diff btwn curr avg and start avg
    
    for (let i = 0; i < INIT_NUM_BUBBLES; i++) { // initialize the bubbles
        bubbles[i] = new Bubble(p,
            p.random(0, p.width),
            p.random(-1.5, -1),
            p.random(10, 20)
        );
    }

}

/**
 * Draw methane bubbles on sketch
 * 
 * @param {*} p p5 ptr
 * @param {*} methaneData Object containing map and arr
 * @param {*} currentDate Current date stored in state
 */
export function drawMethaneBubbles(p, methaneData, currentDate) { // create the bubbles and call their methods
    // make more bubbles and modify speed

    let yyyy = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(currentDate);
    let mm = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(currentDate);
    let dd = "01"
    let date = `${yyyy}-${mm}-${dd}`
    const AVG_START = methaneData.arr[0].average;
    const DATE_START = methaneData.arr[0].date;

    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].move();
        bubbles[i].display();
    }

    // update bubble here
    if (methaneData.map.get(date)) {
        const AVG_CURRENT = methaneData.map.get(date);
        const AVG_DIFF = AVG_CURRENT - AVG_START; // diff btwn curr avg and start avg
        const AVG_RATIO = AVG_START / AVG_CURRENT;
        const NEW_SIZE = parseInt(AVG_DIFF + INIT_NUM_BUBBLES);
        // console.log(`Found date for ${date}\nlength: ${bubbles.length}\nNEW_SIZE: ${NEW_SIZE}`)

        if (NEW_SIZE > bubbles.length) {
            for (let j = bubbles.length; j < NEW_SIZE; j++) {
                bubbles[j] = new Bubble(p,
                    p.random(0, p.width),
                    p.random(-2 / AVG_RATIO * 2, -1.5 / AVG_RATIO * 2),
                    p.random(10, 20))
            }
        }

        if (NEW_SIZE < bubbles.length) {
            let diff = bubbles.length - NEW_SIZE;
            bubbles.length = diff;
        }
    }
    else {
        // console.log(`Could not find date for ${date}`)
        let yyyy = DATE_START.substring(0, 4);
        let mm = DATE_START.substring(5, DATE_START.length).padStart(2, '0');
        let dd = "01"
        let date = new Date(`${yyyy}-${mm}-${dd}`);
        // use last known date (make sure to set first date to earliest and vice versa)
        // update bubble here (could be < lower bound or > upper bound)
        if (date >= currentDate) {
            bubbles = bubbles.splice(0, INIT_NUM_BUBBLES);
        }
    }
    
}


