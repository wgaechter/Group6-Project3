var url = "http://127.0.0.1:5000/json";
//------------------------------------------------------------------------------------
//MAP INFO
//------------------------------------------------------------------------------------
var SunMap = L.map("mapid", {
    center: [35.50, -98.35],
    zoom: 4,
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-streets-v11",
  accessToken: API_KEY
}).addTo(SunMap);

var CloudIcon = L.icon ({
  iconUrl: "/static/sun_icons/cloud.png",
  iconSize: [30, 30],
  popupAnchor: [0, -5]
});
var PartlyIcon = L.icon ({
  iconUrl: "/static/sun_icons/partly.png",
  iconSize: [30, 30],
  popupAnchor: [0, -5]
});
var HazyIcon = L.icon ({
  iconUrl: "/static/sun_icons/hazy.png",
  iconSize: [30, 30],
  popupAnchor: [0, -5]
});
var SunnyIcon = L.icon ({
  iconUrl: "/static/sun_icons/sunny.png",
  iconSize: [30, 30],
  popupAnchor: [0, -5]
});
//------------------------------------------------------------------------------------
//GRAPH INFO
//------------------------------------------------------------------------------------
var svgWidth = 550;
var svgHeight = 300;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var chartwidth = svgWidth - margin.left - margin.right;
var chartheight = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`); 
//------------------------------------------------------------------------------------
//GAGUE INFO
//------------------------------------------------------------------------------------
const knob = pureknob.createKnob(300, 300);

// properties.
knob.setProperty('angleStart', -0.75 * Math.PI);
knob.setProperty('angleEnd', 0.75 * Math.PI);
knob.setProperty('colorFG', '#F3350C');
knob.setProperty('trackWidth', 0.4);
knob.setProperty('valMin', 0);
knob.setProperty('valMax', 100);
knob.setProperty('readonly', true);

knob.setValue(0);
//------------------------------------------------------------------------------------

// Variables for button call event
var reportList = []
var buttonCall = d3.select("#ReportButton")

//------------------------------------------------------------------------------------
// MAP INITIALIZATION
//------------------------------------------------------------------------------------
d3.json(url, function(data){
  console.log(data);
  console.log(data.length);
  var SunData = data
  for (var i = 0; i < data.length; i++) {
    //console.log(`Detected ${SunData[i].CITY}`)
    if (SunData[i].ANN < 55) {
      console.log(`${SunData[i].CITY} is NOT sunny usually!`)
      L.marker([SunData[i].LATITUDE, data[i].LONGITUDE], {
        icon: CloudIcon
      }).bindPopup(data[i].CITY).addTo(SunMap).on("click", function(e) {
        console.log("Clicked Marker")
        var clickedMarker = e.target.getPopup();
        var clickedContent = clickedMarker.getContent();

        reportList = []
        reportList.push(clickedContent)
        
        buttonCall.select("p")
            .text("Generate Report For " + reportList)

        console.log(reportList);
      });   
    }
    if (data[i].ANN >= 55 && data[i].ANN < 60) {
      console.log(`${SunData[i].CITY} is NOT usually sunny usually!`)
      L.marker([data[i].LATITUDE, data[i].LONGITUDE], {
        icon: PartlyIcon
      }).bindPopup(data[i].CITY).addTo(SunMap).on("click", function(e) {
        console.log("Clicked Marker")
        var clickedMarker = e.target.getPopup();
        var clickedContent = clickedMarker.getContent();

        reportList = []
        reportList.push(clickedContent)
        
        buttonCall.select("p")
            .text("Generate Report For " + reportList)

        console.log(reportList);
      });    
    }
    if (data[i].ANN >= 60 && data[i].ANN < 65) {
      console.log(`${SunData[i].CITY} is NOT always sunny usually!`)
      L.marker([data[i].LATITUDE, data[i].LONGITUDE], {
        icon: HazyIcon
      }).bindPopup(data[i].CITY).addTo(SunMap).on("click", function(e) {
        console.log("Clicked Marker")
        var clickedMarker = e.target.getPopup();
        var clickedContent = clickedMarker.getContent();

        reportList = []
        reportList.push(clickedContent)
        
        buttonCall.select("p")
            .text("Generate Report For " + reportList)
      
        console.log(reportList);
      });    
    }
    if (data[i].ANN >= 65) {
      console.log(`${SunData[i].CITY} is sunny usually!`)
      L.marker([data[i].LATITUDE, data[i].LONGITUDE], {
        icon: SunnyIcon
      }).bindPopup(data[i].CITY).addTo(SunMap).on("click", function(e) {
        console.log("Clicked Marker")
        var clickedMarker = e.target.getPopup();
        var clickedContent = clickedMarker.getContent();

        reportList = []
        reportList.push(clickedContent)
        
        buttonCall.select("p")
            .text("Generate Report For " + reportList)

        console.log(reportList);
      });  
    }
  };
});
//------------------------------------------------------------------------------------

//EVENT LISTENER FOR BUTTON  - SHOULD BE ABLE TO WORK OFF OF reportList and a loop through data finding city.

buttonCall.on("click", function() {
  console.log("Button Clicked")
  console.log(reportList)

  //Error message if no city selected
  if (reportList.length == 0) {
    alert("Please click a city marker to generate a report for that city.");
  }
  
  //CLEAR GRAPH AREA
  d3.selectAll('svg > g > *').remove();

  //Data pull for all visuals
  d3.json(url, function(data) {

    console.log(data);
    console.log(data.length);
    var GraphData = data
    //Loop for City Info/Snippet Above Charts
    for (var i = 0; i < GraphData.length; i++) { 
      if (GraphData[i].CITY == reportList[0]) {
        console.log(GraphData[i])
        d3.select("#CityTitle")
            .text(`${GraphData[i].CITY}, ${GraphData[i].STATE_CODE}`)
        if (GraphData[i].ANN >= 65) {
          d3.select("#CityInfo")
            .text(`${GraphData[i].CITY} is usually gonna be sunny!`)
        }
        else if (GraphData[i].ANN >= 55) {
          d3.select("#CityInfo")
            .text(`${GraphData[i].CITY} will probably be sunny!`)
        }
        else if (GraphData[i].ANN >= 45) {
          d3.select("#CityInfo")
            .text(`${GraphData[i].CITY} will hopefully be sunny!`)
        }
        else {
          d3.select("#CityInfo")
            .text(`${GraphData[i].CITY} will be sunny if you're lucky!`)
        }
      };
    };  
    //Dial Change Info
    for (var i = 0; i < GraphData.length; i++) { 
      if (GraphData[i].CITY == reportList[0]) {
        knob.setValue(GraphData[i].ANN);
        var ann = GraphData[i].ANN;
        if(ann<50) {
            knob.setProperty('colorFG', '#DAF7A6')
        }
        else if(ann<60) {
            knob.setProperty('colorFG', '#FFC300')
        }
        else if(ann<70){
            knob.setProperty('colorFG', '#FF5733')
        }
        else if(ann<80){
            knob.setProperty('colorFG', '#C70039')
        }
        else {
            knob.setProperty('colorFG', '#900C3F')
        }
     };
    }; 
    //Chart Info Pull
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
    //Building Chart
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
        .attr("x", 0 - (chartheight / 1))// sub 0 to make sure it's going up
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Percent of Sunshine");
  
      chartGroup.append("text")
        .attr("transform", `translate(${chartwidth / 2}, ${chartheight + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Month of year");
  });  
});

//Ending Code for Gauge
const node = knob.node();

const elem = document.getElementById('gauge');
elem.appendChild(node);