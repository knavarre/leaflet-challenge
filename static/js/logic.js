
// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

// Function to create Map Features
function createFeatures(earthquakeData) {

    //Create function to retrieve earthquake magnitude values
    function getMagnitudes(feature){
        return feature.properties.mag*5
    };

    //Create fuction to color earquakes by depth
    function depthColors(feature){
        if (feature.geometry.coordinates[2] > 90){return 'red'}
        else if (feature.geometry.coordinates[2] >70){return 'orangered'}
        else if (feature.geometry.coordinates[2] >50){return 'orange'}
        else if (feature.geometry.coordinates[2] >30){return 'limegreen'}
        else if (feature.geometry.coordinates[2] >10){return 'green'}
        else return 'blue'
    };

  // Create function for Popup information (location, magnitude, depth)
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3>
    <hr><p>magnitude ${feature.properties.mag}
    <hr><p>depth ${feature.geometry.coordinates[2]}m</p>`);
  };

  // Create function for Marker
  function pointToCircle(point, latlng){
    return L.circleMarker(latlng)
  };

  // Create function for Marker style (radius = magnitude, color = depth)
  function earthquakeStyle(geo_feature){
    return {'radius': getMagnitudes(geo_feature), 'color': depthColors(geo_feature)};
  };

  // Create a GeoJSON layer that contains the features created through the above functions
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature, 
    pointToLayer: pointToCircle,
    style: earthquakeStyle
  });

  // Send our earthquakes layer to the createMap function
  createMap(earthquakes);
}

// Function to create Map 
function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.Pass it our baseMaps and overlayMaps. Add to map. 
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

};

