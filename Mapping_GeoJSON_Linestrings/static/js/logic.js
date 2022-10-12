// We create the streets view tile layer that will be an option for our map.
let navDay = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/navigation-day-v1',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let navNight = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/navigation-night-v1',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    'Day Navigation': navDay,
    'Night Navigation': navNight
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [navNight]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Add GeoJSON data.
let torontoData = 'https://raw.githubusercontent.com/Baldo431/Mapping_Earthquakes/main/torontoRoutes.json';

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2,
    opacity: 0.5
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(data => {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data,{
        style: myStyle,
        onEachFeature: (feature, layer)=>{
            layer.bindPopup(`<h2>Airline: ${feature.properties.airline}</h2><hr><h3>Destination: ${feature.properties.dst}</h3>`);
        }
    }).addTo(map);
});

