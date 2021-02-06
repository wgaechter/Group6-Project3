
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
