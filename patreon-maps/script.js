L.mapbox.accessToken = 'pk.eyJ1IjoibGlmZXdpbm5pbmciLCJhIjoiYWZyWnFjMCJ9.ksAPTz72HyEjF2AOMbRNvg';
var map = L.mapbox.map('map', 'lifewinning.ip7d4kdk').addControl(L.mapbox.geocoderControl('mapbox.places', {
        autocomplete: true
    }))
    .setView([0,0],2);


//all the things are being stored here
var things = [];

var drawnItems = new L.FeatureGroup();
// var hellaCheat = new L.FeatureGroup();
// map.addLayer(hellaCheat);
map.addLayer(drawnItems);

//set draw controls
var drawControl = new L.Control.Draw({
// position: 'topright',
draw: {
	polygon: {
		allowIntersection: false,
		showArea: true,
		drawError: {
			color: '#feb24c',
			timeout: 1000
		},
		shapeOptions: {
			color: '#feb24c'
		}
	},
	circle: false,
	rectangle: false,
	marker: false,
	polyline:false
},
// NO EDITING IN THIS BECAUSE I MADE AWFUL CHOICES I AM SORRY FOR WHAT I HAVE DONE
edit: {
	featureGroup: drawnItems
}
});
map.addControl(drawControl);

 map.on('draw:created', function(e) {
     drawnItems.addLayer(e.layer);
  });

var loc = document.querySelector('#location')

L.DomUtil.get("submit").onclick=function() {
	string = JSON.stringify(drawnItems.toGeoJSON())
	console.log(string)
	loc.value = string
	// console.log(loc)
}