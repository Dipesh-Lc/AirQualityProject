var map = L.map("map").setView([28.209631947920577, 83.98551214262703], 12);


$.getJSON("static/pokhara.geojson").then(function (geoJSON) {

  ///Basemaps
  var osm = new L.TileLayer.BoundaryCanvas('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    boundary: geoJSON,
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  });

  // https: also suppported.
  var Esri_WorldImagery = new L.TileLayer.BoundaryCanvas(
    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    boundary: geoJSON,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  });

  map.addLayer(osm, Esri_WorldImagery);
  var pokhara = L.geoJSON(geoJSON);
  var bounds = pokhara.getBounds();
  // map.fitBounds(bounds);
  map.setMaxBounds(bounds);
  map.on('drag', function () {
    map.panInsideBounds(bounds, { animate: false });
  });

  function getPm10Color(d) {
    return d > 424 ? 'maroon' :
      d > 354 ? 'purple' :
        d > 254 ? 'red' :
          d > 154 ? 'orange' :
            d > 54 ? 'yellow' :
              'green';
  }

  function getPm2_5Color(d) {
    return d > 250.4 ? 'maroon' :
      d > 150.4 ? 'purple' :
        d > 55.4 ? 'red' :
          d > 35.4 ? 'orange' :
            d > 12 ? 'yellow' :
              'green';
  }

  // layers and overlays begining
  function showData(t, e) {
    $('#lat').text(" " + e['lat']).css('color', t.target.options["color"])
    $('#lng').text(" " + e['lng']).css('color', t.target.options["color"])
    $('#pm10').text(" " + e['pm10']).css('color', t.target.options["color"])
    $('#pm2_5').text(" " + e['pm2_5']).css('color', t.target.options["color"])
    t.target.setRadius(200)
  }

  function hideData(t) {
    $('#lat').text("")
    $('#lng').text("")
    $('#pm10').text("")
    $('#pm2_5').text("")
    t.target.setRadius(50)
  }

  $.ajax({
    url: 'http://localhost:8000/api/airquality/',
    success: function (data) {
      var pm10_data = [];
      var pm2_5_data = [];
      data.forEach(e => {
        pm10_data.push(L.circle([e['lat'], e['lng']], { radius: 50 }).setStyle({ color: getPm10Color(e["pm10"]), fillOpacity: 1 }).on({ "mouseover": function (t) { showData(t, e) }, "mouseout": function (t) { hideData(t) } }))
        pm2_5_data.push(L.circle([e['lat'], e['lng']], { radius: 50 }).setStyle({ color: getPm2_5Color(e["pm2_5"]), fillOpacity: 1 }).on({ "mouseover": function (t) { showData(t, e) }, "mouseout": function (t) { hideData(t) } }))
      });

      var pm10 = L.featureGroup(pm10_data).addTo(map)
      var pm2_5 = L.featureGroup(pm2_5_data).addTo(map)

      var groupedOverlays = {
        "PM10": pm10,
        "PM2.5": pm2_5
      };

      L.control.layers(baseMaps, groupedOverlays).addTo(map);
    }
  });

  var baseMaps = {
    "Imagery": Esri_WorldImagery,
    "Open Street Map": osm,
  };

});

// Legend Section
L.control.Legend({
  position: "bottomright",
  legends: [
    {
      label: "Healthy",
      type: "rectangle",
      color: "green",
      fillColor: "green",
    },
    {
      label: "Moderate",
      type: "rectangle",
      color: "yellow",
      fillColor: "yellow",
    },
    {
      label: "Unhealthy for S",
      type: "rectangle",
      color: "orange",
      fillColor: "orange",
    },
    {
      label: "Unhealthy",
      type: "rectangle",
      color: "red",
      fillColor: "red",
    },
    {
      label: "Very Unhealthy",
      type: "rectangle",
      color: "purple",
      fillColor: "purple",
    },
    {
      label: "Hazardous",
      type: "rectangle",
      color: "maroon",
      fillColor: "maroon",
    },
  ]
}).addTo(map);

// Chart Section
const labels = [
  "Healthy",
  "Moderate",
  "Unhealthy for S",
  "Unhealthy",
  "Very Unhealthy",
  "Hazardous",
];

const data = {
  labels: labels,
  datasets: [{
    label: 'Air Quality Variation',
    backgroundColor: [
      'green',
      'yellow',
      'orange',
      'red',
      'purple',
      'maroon'
    ],
    borderColor: [
      'green',
      'yellow',
      'orange',
      'red',
      'purple',
      'maroon'
    ],
    data: [5, 10, 5, 2, 20, 30],
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {}
};

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);
