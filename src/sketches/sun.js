//var yvalues;
//var size_index = 0;
export let hoveredSunData = { mouseOver: false, value: null };
var currentY_value = 0;
let hoveredSun = null;
let sunObject = null;

class Sun {
    /**
     * Constructor for sun
     *
     * @param {*} p p5 ptr
     */
    constructor(p) {
        // class for sun object
        this.x = p.windowWidth / 2;
        this.y = p.windowHeight / 2;
        this.size = currentY_value * 100;
        
        /**
         * Display sun on sketch
         */
        this.display = function (p, currentDate, temperatureData) {
            var color = changeSunColor(p, currentDate, { r: 232, g: 152, b: 98 }, { r: 200, g: 100, b: 90 }, temperatureData
            );

            p.fill(color.r, color.g, color.b);

            p.ellipse(this.x, this.y, currentY_value * 100);
            if (hoveredSunData.mouseOver) {
                p.fill(225, 225, 0, 70);
                p.ellipse(this.x, this.y, currentY_value * 100 + 20);
            }
        };

        /**
         * Behavior for sun movement
         */
        this.move = function () {
            // check if mouse is pressed and within range of sun
            if (p.mouseIsPressed && p.dist(p.mouseX, p.mouseY, this.x, this.y) < this.size / 2 + 20) {
                //get the sun above the ocean
                if (p.mouseY < p.height / 2) {
                    hoveredSunData.mouseOver = true;
                    hoveredSun = this;
                }
            }
        };
    }
}

export function resizeSun(p) {
    sunObject.x = p.windowWidth / 2;
    sunObject.y = p.windowHeight / 2;
}

export function setUpSun(p, temperatureData, current_date) {
    calcSun(temperatureData, current_date);
    sunObject = new Sun(p);
}

export function drawSun(p, temperatureData, current_date) {
    calcSun(temperatureData, current_date);
    createSun(p, temperatureData, current_date);
}

function calcSun(temperatureData, current_date) {
    if (temperatureData != null) {
        //get current date based on scroller and year
        var currentDate = current_date.getFullYear();
        var index = ((currentDate - 1880) * temperatureData.length) / 140 - 100;

        var i = Math.round(index);
        var average = 0;
        for (var count = 0; count < 100; count++) {
            average = average + parseFloat(temperatureData[i + count].station);
        }

        currentY_value = average / 50 + 2;
        hoveredSunData.value = Number.parseFloat(currentY_value.toFixed(2) - 2).toPrecision(4);
    }
}

function createSun(p, temperatureData, currentDate) {
    if (temperatureData != null) {
        if (!hoveredSunData.mouseOver) {
            sunObject.move();
        } else if (p.mouseY > p.height / 2) {
            hoveredSunData.mouseOver = false;
        } else if (p.dist(p.mouseX, p.mouseY, hoveredSun.x, hoveredSun.y) > hoveredSun.size / 2 + 20) {
            hoveredSunData.mouseOver = false;
        }
        sunObject.display(p, currentDate, temperatureData);
    }
}

function changeSunColor(p, currentDate, startColor, endColor, temperatureData) {
    var currentYear = currentDate.getFullYear();

    var index = ((currentYear - 1880) * temperatureData.length) / 140 - 100;

    var i = Math.round(index);
    var average = 0;
    for (var count = 0; count < 100; count++) {
        average = average + parseFloat(temperatureData[i + count].station);
    }
    
    //smallest is 0 largest is 115
    average = average + 3;

    var rGap = (startColor.r - endColor.r) / 115;
    var gGap = (startColor.g - endColor.g) / 115;
    var bGap = (startColor.b - endColor.b) / 115;

    // code body moved outside (above) statement block
    var rIndex = startColor.r - ((rGap * average) | 0);
    var gIndex = startColor.g - ((gGap * average) | 0);
    var bIndex = startColor.b - ((bGap * average) | 0);

    return { r: rIndex, g: gIndex, b: bIndex };
}
