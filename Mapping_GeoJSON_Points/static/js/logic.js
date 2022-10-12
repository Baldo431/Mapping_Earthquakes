// Create the map object with a center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);

// We create the streets view tile layer that will be an option for our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Add GeoJSON data.
let airportData  = 'https://raw.githubusercontent.com/Baldo431/Mapping_Earthquakes/main/majorAirports.json';

// Grabbing our GeoJSON data.
d3.json(airportData).then(data => {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data,{
        onEachFeature: (feature, layer)=>{
            layer.bindPopup(`<h2>Airport code: ${feature.properties.faa}</h2><hr><h3>Airport name: ${feature.properties.name}</h3>`);
        }
    }).addTo(map);
});



// Adding geojson marker and popup using pointToLayer.
// L.geoJSON(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: (feature, latlng)=> {
//       console.log(feature);
//       return L.marker(latlng).bindPopup(`<h2>${feature.properties.name}</h2><hr><h3>${feature.properties.city}, ${feature.properties.country}</h3>`);
//     }

// }).addTo(map);

// Adding geojson marker and popup using onEachFeature.
// L.geoJSON(sanFranAirport, {
//     onEachFeature: (feature, layer)=> {
//       console.log(layer);
//       layer.bindPopup(`<h2>Airport code: ${feature.properties.faa}</h2><hr><h3>Airport name: ${feature.properties.name}</h3>`);
//     }
// }).addTo(map);