
function markerSize(feature) {
    return Math.sqrt(Math.abs(feature.properties.mag)) * 5;
  }
  

  var colors = ["#edf8fb", "#b2e2e2", "#66c2a4", "#FF8C00", "#2ca25f", "#006d2c"]
  function fillColor(feature) {
    var mag = feature.properties.mag;
    if (mag <= 1) {
      return colors[0]
    }
    else if (mag <= 2) {
      return colors[1]
    }
    else if (mag <= 3) {
      return colors[2]
    }
    else if (mag <= 4) {
      return colors[3]
    }
    else if (mag <= 5) {
      return colors[4]
    }
    else {
      return colors[5]
    }
  }
  
  var attribution = "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>";
  
  var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: attribution,
    maxZoom: 8,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
  });
  
  var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{
    attribution: attribution,
    maxZoom: 8,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });
  
  var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{
    attribution: attribution,
    maxZoom: 8,
    id: "mapbox/outdoors-v11",
    accessToken: API_KEY
  });
  
  var baseMaps = {
    "Satellite": satelliteMap,
    "Grayscale": lightMap,
    "Outdoors": outdoorsMap
  };
var map = L.map("mapid",{
  center: [40.7, -94.5],
  zoom: 3,
  layers: [satelliteMap, lightMap, outdoorsMap]


});
lightMap.addTo(map);

   var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php";
  
 
   var earthquakes = new L.LayerGroup();

  d3.json(queryUrl, function(data) {
  
      L.geoJSON(data, {
  
          pointToLayer: function (feature, latlng) {
            var geojsonMarkerOptions = {
              radius: 8,
              stroke: false,
              radius: markerSize(feature),
              fillColor: fillColor(feature),
              weight: 5,
              opacity: .8,
              fillOpacity: .8
            };
            return L.circleMarker(latlng, geojsonMarkerOptions);
          },
    
          onEachFeature: function (feature, layer) {
            return layer.bindPopup(`<strong>Place:</strong> ${feature.properties.place}<br><strong>Magnitude:</strong> ${feature.properties.mag}`);
          }
        }).addTo(earthquakes);
        earthquakes.addTo(map);
  
      // var platesStyle = {
      //     "color": "white",
      //     "weight": 2,
      //     "opacity": 1,
      //     fillOpacity: 0,
      //   };
      //   var plates = L.geoJSON(platesData, {
      //    style: platesStyle
      //   });
    
        var overlayMaps = {
          //"Fault lines": plates,
          "Earthquakes": earthquakes,
        };
  
    
        L.control.layers(baseMaps, overlayMaps, {
          collapsed: false
        }).addTo(map);
    
        var legend = L.control({ position: "bottomright" });
        legend.onAdd = function() {
          var div = L.DomUtil.create("div", "info legend");
          var limits = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
          var labelsColor = [];
          var labelsText = [];
    
          var labelsColorHtml =  "<ul>" + labelsColor.join("") + "</ul>";
          var labelsTextHtml = `<div id="labels-text">${labelsText.join("<br>")}</div>`;
    
          var legendInfo = "<h4>Earthquake<br>Magnitude</h4>" +
            "<div class=\"labels\">" + labelsColorHtml + labelsTextHtml
            "</div>";
          div.innerHTML = legendInfo;
    
          return div;
        };
    
        legend.addTo(map);
    
       })
    