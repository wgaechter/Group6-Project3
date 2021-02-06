
var url = "http://127.0.0.1:5000/json";
//var reportList = []
var buttonCall = d3.select("#ReportButton")
//function plots() {
    // getting data from the json file
    d3.json(url,function(data) {      
      console.log(reportList)

        console.log(data)
      // Create knob element, 300 x 300 px in size.
const knob = pureknob.createKnob(300, 300);

// Set properties.
knob.setProperty('angleStart', -0.75 * Math.PI);
knob.setProperty('angleEnd', 0.75 * Math.PI);
knob.setProperty('colorFG', '#F3350C');
knob.setProperty('trackWidth', 0.4);
knob.setProperty('valMin', 0);
knob.setProperty('valMax', 100);
knob.setProperty('readonly', true);

// Set initial value.
knob.setValue(0);

 //Event listener.
 buttonCall.on("click", function() {
 // console.log("Button Clicked")
  console.log("Dial.js")
 
  //console.log(reportList)

  d3.json(url, function(data) {
    d3.selectAll('svg > g > *').remove();
    console.log(data);
    console.log(data.length);
    var GraphData = data
    for (var i = 0; i < GraphData.length; i++) { 
      if (GraphData[i].CITY == reportList[0]) {
        knob.setValue(GraphData[i].ANN);
        var ann = GraphData[i].ANN;
        if(ann<50) {
            knob.setProperty('colorFG', '#DAF7A6');}
        else if(ann<60) {
            knob.setProperty('colorFG', '#FFC300');}
        else if(ann<70){
            knob.setProperty('colorFG', '#FF5733');}
        else if(ann<80){
            knob.setProperty('colorFG', '#C70039');}
        else{
            knob.setProperty('colorFG', '#900C3F');}
       
     };
    }; 
    
    
    //*************** */
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
//********************************** */




  });  
});

 // Parameter 'knob' is the knob object which was
 // actuated. Allows you to associate data with
 //it to discern which of your knobs was actuated.
 
  //Parameter 'value' is the value which was set
 // the user/
//const listener = function(knob, value) {
// 	console.log(value);
// };

//knob.addListener(listener);

// Create element node.
const node = knob.node();

// Add it to the DOM.
const elem = document.getElementById('gauge');
elem.appendChild(node);
    });
