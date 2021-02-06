
var svgWidth = 750;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var chartwidth = svgWidth - margin.left - margin.right;
var chartheight = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`); 
// var parseTime = d3.timeParse("%B");
/////**************************** */
// var url = "http://127.0.0.1:5000/json";
// //var reportList = []
// var buttonCall = d3.select("#ReportButton");
//function plots() {
    // getting data from the json file
    // d3.json(url,function(data) {      
    //   console.log(reportList)


    //     console.log(data)
buttonCall.on("click", function() {
    d3.json(url,function(data) {
        console.log(data);
        console.log(data.length);
        var GraphData = data
        for (var i = 0; i < GraphData.length; i++) { 
          if (GraphData[i].CITY == reportList[0]) {
            console.log(GraphData[i])
            var arr= [];
            arr.push({text:1, val: parseFloat(GraphData[i].JAN)});
            arr.push({text:2, val: parseFloat(GraphData[i].FEB)});
            arr.push({text:3, val: parseFloat(GraphData[i].MAR)});
            arr.push({text:4, val: parseFloat(GraphData[i].APR)});
            arr.push({text:5, val: parseFloat(GraphData[i].MAY)});
            arr.push({text:6, val: parseFloat(GraphData[i].JUN)});
            arr.push({text:7, val: parseFloat(GraphData[i].JUL)});
            arr.push({text:8, val: parseFloat(GraphData[i].AUG)});
            arr.push({text:9, val: parseFloat(GraphData[i].SEP)});
            arr.push({text:10, val: parseFloat(GraphData[i].OCT)});
            arr.push({text:11, val: parseFloat(GraphData[i].NOV)});
            arr.push({text:12, val: parseFloat(GraphData[i].DEC)});
        
            console.log(arr)
          };
        };

    // var month= ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
        // GraphData.forEach(function(arr) {
        //     // arr.val = +arr.val;
        //     arr.text= parseTime(arr.text);
        // });
        var xScale = d3.scaleLinear()
            .range([0, chartwidth])
            .domain(d3.extent(arr, arr => arr.text))
            
        var yScale = d3.scaleLinear()
            .range([chartheight, 0])
            .domain([0, d3.max(arr, arr => arr.val)]);
        
        var bottomAxis = d3.axisBottom(xScale);
        var leftAxis = d3.axisLeft(yScale);
        
        var drawLine = d3.line()
            .x(arr => xScale(arr.text))
            .y(arr => yScale(arr.val));
            
        chartGroup.append("path")
            .attr("stroke", "red")
            .attr("stroke-width", "1")
            .attr("fill", "none")
            .attr("d", drawLine(arr))
            .classed("line", true);
            
        chartGroup.append("g")
            .classed("axis", true)
            .call(leftAxis);
            
            
        chartGroup.append("g")
            .classed("axis", true)
            .attr("transform", "translate(0, " + chartheight + ")")
            .call(bottomAxis)
            

        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 40)
            .attr("x", 0 - (chartheight / 2))// sub 0 to make sure it's going up
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Percent of Sunshine");
      
          chartGroup.append("text")
            .attr("transform", `translate(${chartwidth / 2}, ${chartheight + margin.top + 30})`)
            .attr("class", "axisText")
            .text("Month of year");

        // chartGroup.append("text")
        
            
        //     .attr("class", "axisText")
        //     .text(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);
    });
});            