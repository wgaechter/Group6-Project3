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


var url = "http://127.0.0.1:5000/json";

d3.json(url, function(data) {
  console.log(data)
});

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);