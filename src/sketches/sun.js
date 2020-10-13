//var yvalues;
//var size_index = 0;
var currentY_value = 0;

export function setupSun(p) {
    //p.noStroke();
    //yvalues = new Array(p.floor(200));
    p.background("blue");
}

export function sun(p, temperatureData, current_date) {

    calcSun(temperatureData,current_date);
    //changeY(current_date);
    //console.log(temperatureData);
    drawSun(p, temperatureData);
}

function calcSun(temperatureData,current_date) {
    if (temperatureData != null) {

      //get current date based on scroller
      //get year
      var currentDate=current_date.getFullYear()
      if (currentDate == 2020){
        currentDate = 2015

      }
      var index = ((currentDate-1880)*temperatureData.length/140 )-100

      var i = Math.round(index)
      var average = 0;
      for (var count=0;count<100;count++){
        average=average + parseFloat(temperatureData[i+count].station)
      }
      //console.log(i);
      console.log(average);
      currentY_value = (average/100)+2
      //yvalues[i] = average + 1;
        /*for (let i = 0; i < temperatureData.length / 8; i++) {
            var average = parseFloat(temperatureData[i * 8].station); // + parseFloat(temperatureData[i * 8].land)) / 2);
            yvalues[i] = average + 1;
        }*/
    }
};

/*function changeY ()  {
    if (size_index === yvalues.length) size_index = 0;

    size_index += 1;
};*/

function drawSun(p, temperatureData) {
    if (temperatureData != null) {
        //console.log(currentY_value);
        p.ellipse(
            p.width,
            0,
            //yvalues[size_index] * 50,
            //yvalues[size_index] * 50
            currentY_value * 100,
            currentY_value *100
        );
        p.fill("yellow");
    }
};
