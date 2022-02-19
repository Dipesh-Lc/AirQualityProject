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

  // layers and overlays begining
  var testData;
  $.ajax({
    url: 'http://localhost:8000/api/airquality/',
    success: function (data) {
      data.forEach(element => {
        L.circle([element['lat'], element['lng']], {radius: 50}).setStyle({color: 'yellow'}).addTo(map)
      });
  //     testData = { "max": 170, "data": data };
  //     testData1 = { "max": 88, "data": data };
  //     var cfg = {
  //       // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  //       "radius": 10,
  //       "maxOpacity": .8,
  //       // scales the radius based on map zoom
  //       "scaleRadius": false,
  //       // if set to false the heatmap uses the global maximum for colorization
  //       // if activated: uses the data maximum within the current map boundaries 
  //       //   (there will always be a red spot with useLocalExtremas true)
  //       "useLocalExtrema": true,
  //       // which field name in your data represents the latitude - default "lat"
  //       latField: 'lat',
  //       // which field name in your data represents the longitude - default "lng"
  //       lngField: 'lng',
  //       // which field name in your data represents the data value - default "value"
  //       valueField: 'pm10'
  //     };

  //     var cfg1 = {
  //       "radius": 10,
  //       "maxOpacity": .8,
  //       "scaleRadius": false,
  //       "useLocalExtrema": true,
  //       latField: 'lat',
  //       lngField: 'lng',
  //       valueField: 'pm2_5'
  //     };

  //     //heatmaplayers 
  //     var heatmapLayer = new HeatmapOverlay(cfg);
  //     var heatmapLayer1 = new HeatmapOverlay(cfg1)
      
      
      var markerLayer = L.circle([28.22, 83.92], {radius: 50}).addTo(map);
      markerLayer.setStyle({color: 'red', fillOpacity: 1})

      var markerLayer1 = L.circle([28.22, 83.91], {radius: 50}).addTo(map);

      var groupedOverlays = {
        // "PM10": heatmapLayer,
        // 'PM2.5': heatmapLayer1,
        "PM10": markerLayer,
        "PM2.5": markerLayer1
      };

      L.control.layers(baseMaps, groupedOverlays).addTo(map);
      // layers and overlays ending
      // heatmapLayer.setData(testData);
      // heatmapLayer1.setData(testData1);
    }
  });

  var baseMaps = {
    "Imagery": Esri_WorldImagery,
    "Open Street Map": osm,
  };

  // var cfg = {
  //   // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  //   "radius": 5,
  //   "maxOpacity": .8,
  //   // scales the radius based on map zoom
  //   "scaleRadius": false,
  //   // if set to false the heatmap uses the global maximum for colorization
  //   // if activated: uses the data maximum within the current map boundaries 
  //   //   (there will always be a red spot with useLocalExtremas true)
  //   "useLocalExtrema": true,
  //   // which field name in your data represents the latitude - default "lat"
  //   latField: 'lat',
  //   // which field name in your data represents the longitude - default "lng"
  //   lngField: 'lng',
  //   // which field name in your data represents the data value - default "value"
  //   valueField: 'pm10'
  // };


  // var heatmapLayer = new HeatmapOverlay(cfg);


  // var groupedOverlays = {
  //   "PM10": heatmapLayer,
  //   'PM2.5': pm2_5,
  // };

  // L.control.layers(baseMaps, groupedOverlays).addTo(map);
  // // layers and overlays ending
  // heatmapLayer.setData(testData);
});

// $.ajax({
//   url: 'http://localhost:8000/api/airquality/',
//   success: function (data) {
//     console.log(data)
//   }
// });

// $.getJSON("static/data.json").then(function (data) {
//   data.forEach(element => {
//     L.marker([element["coordinate"]["lat"], element["coordinate"]["lng"]]).addTo(map)
//       .bindPopup(`<h3>PM 2.5: ${element["pm2.5"]}</h3><h3>NO2: ${element["no2"]}</h3>`)
//       .openPopup();
//   });
// })

L.control.Legend({
  position: "bottomright",
  legends: [{
      label: "Marker1",
      type: "image",
      // url: "marker/marker-red.png",
  }]
}).addTo(map);
