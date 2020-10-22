//inital background color (38,238,228)
//final background color (15,26,155)
export function drawSky(p, carbonData, currentDate) {
    var currentYear = currentDate.getFullYear();
    //underData
    if (currentYear < 2010) {
        var yearIdex = currentYear - 1950;
        //constants for changing color
        var rGap = 0.3;
        var gGap = 3;
        var bGap = 1.9;
        //
        var rIndex = 38 - ((rGap * yearIdex) | 0);
        var gIndex = 238 - ((gGap * yearIdex) | 0);
        var bIndex = 228 - ((bGap * yearIdex) | 0);

        p.background(rIndex, gIndex, bIndex);
    }
    //over data
    else if (currentYear > 2019) {
        //original color choice
        p.background(231, 181, 137);
    }
    /* warnings
    else {
        //there are 10 year in the carbon data
        //get the index gap of carbon data
        var yearGap = carbonData.length / 10;
        var monthGap = yearGap / 12;

        var year_index = currentYear - 2010;
        var month_index = currentDate.getMonth();
        var current_index = yearGap * year_index + month_index * monthGap;
        current_index = current_index | 0;

        // var average = 0;
        console.log(current_index);
        for (var i = 0; i < monthGap - 1; i += 1) {
            console.log(carbonData[current_index].cycle);
            //   average += carbonData[current_index+1];
        }

        p.background(231, 181, 137);
    }
    */
}
