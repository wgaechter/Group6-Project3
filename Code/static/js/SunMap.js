var url = "http://127.0.0.1:5000/json";

var SunMap = L.map("mapid", {
    center: [39.50, -98.35],
    zoom: 4,
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(SunMap);

var CloudIcon = L.icon ({
  iconUrl: "/static/sun_icons/cloud.png",
  iconSize: [50, 50],
  popupAnchor: [0, -25]
});
var PartlyIcon = L.icon ({
  iconUrl: "/static/sun_icons/partly.png",
  iconSize: [50, 50],
  popupAnchor: [0, -25]
});
var HazyIcon = L.icon ({
  iconUrl: "/static/sun_icons/hazy.png",
  iconSize: [50, 50],
  popupAnchor: [0, -25]
});
var SunnyIcon = L.icon ({
  iconUrl: "/static/sun_icons/sunny.png",
  iconSize: [50, 50],
  popupAnchor: [0, -25]
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


d3.json(url, function(data){
  console.log(data);
  console.log(data.length);
  var SunData = data.object
  for (var i = 0; i < data.length; i++) {
    console.log(`Detected ${SunData[i]}`)
    /* if (SunData[i].ann < 60) {
      console.log(SunData[i].city)
      L.marker([SunData[i].latitude, data[i].longitude], {
        icon: CloudIcon
      }).bindPopup("<h1>" + data[i].city + "</h1>").addTo(SunMap);  
    }
    if (data[i].ann >= 60) {
      L.marker([data[i].latitude, data[i].longitude], {
        icon: SunnyIcon
      }).bindPopup("<h1>" + data[i].city + "</h1>").addTo(SunMap);  
    } */
  };
});
/* const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise); */