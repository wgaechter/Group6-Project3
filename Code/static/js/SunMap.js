var url = "http://127.0.0.1:5000/json";

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

// ICON TESTING 
// ------------------------------------------------------------------
/* L.marker([39.50, -98.35]).addTo(SunMap);

L.marker([39.50, -98.35], {
  icon: CloudIcon
}).bindPopup("<h1>Cloud Icon Test</h1>").addTo(SunMap); 

L.marker([39.50, -90], {
  icon: PartlyIcon
}).bindPopup("<h1>Partly Icon Test</h1>").addTo(SunMap); 

L.marker([39.50, -85], {
  icon: HazyIcon
}).bindPopup("<h1>Hazy Icon Test</h1>").addTo(SunMap); 

L.marker([39.50, -80], {
  icon: SunnyIcon
}).bindPopup("<h1>Partly Icon Test</h1>").addTo(SunMap); 
 */
//-----------------------------------------------------------------------

// Variables for button call event
var reportList = []
var buttonCall = d3.select("#ReportButton")

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

//EVENT LISTENER FOR BUTTON  - SHOULD BE ABLE TO WORK OFF OF reportList and a loop through data finding city.

buttonCall.on("click", function() {
  console.log("Button Clicked")
  console.log(reportList)

  if (reportList.length == 0) {
    alert("Please click a city marker to generate a report for that city.");
  }

  d3.json(url, function(data) {
    console.log(data);
    console.log(data.length);
    var GraphData = data
    //error message for clicking generate button with no city attached
    for (var i = 0; i < GraphData.length; i++) { 
      if (GraphData[i].CITY == reportList[0]) {
        console.log(GraphData[i])
      };
    };  
  });  
});


/* const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise); */