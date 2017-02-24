var map = L.mapbox.map('map', 'lifewinning.map-53lvkbot', {zoomControl: false})
    .setView([39.1216, -76.7731], 15);
var ui = document.getElementById('map-ui');
//map.scrollWheelZoom.disable();

new L.Control.Zoom({ position: 'bottomright' }).addTo(map);

//layer with all the buildings
var bldgstyle = {
    "color": "#4B6E88",
    "weight": 7,
    "opacity": 0.7
};



function popUp(f,l){
    var popUpcontent = '<h2>'+f.properties.Name+'</h2><hr><strong>Construction Date: </strong>'+ f.properties.constructionDate +'<br><strong>Square Feet: </strong>'+ f.properties.squareFeet + '<br><strong>Tenants: </strong>'+ f.properties.Tenant ;
    l.bindPopup(popUpcontent);
    };

baselayer = L.mapbox.tileLayer('lifewinning.map-53lvkbot');
map2002 = L.mapbox.tileLayer('occupy.2002_md');
map2006 = L.mapbox.tileLayer('occupy.satellite_tests');
map2013 = L.mapbox.tileLayer('lifewinning.map-0lnszm21');
nas = L.mapbox.tileLayer('occupy.NBP_NAS');
bldgs = new L.geoJson.ajax("js/map.geojson",  {onEachFeature: popUp, style: bldgstyle});

//bldgs = new L.geoJson.ajax("js/bldgs.geojson",  {onEachFeature: popUp, style: bldgstyle});

//here are the sattellite layers
addLayer(nas, "1996 (drawing)", 'nas_1996', "drawing of the National Business Park found in archive.org copy of <a href=http://www.fas.org/irp/nsa/oldind.html>Federation of American Scientists website</a>.");
addLayer(map2002, '2002', 'sat_2002', "Images of the National Business Park in 2002 from the <a href=earthexplorer.usgs.gov>USGS Earth Explorer site</a>.");
addLayer(map2006, '2006', 'sat_2006', "Between 2002 and 2006, 1,102,940 square feet of office space in 8 new buildings were added to the National Business Park. 2002 was the same year that the NSA began the notoriously expensive <a href=https://en.wikipedia.org/wiki/Trailblazer_Project>Project Trailblazer</a>, involving SAIC, Boeing, Computer Sciences Corporation (CSC), and Booz Allen Hamilton. Images via <a href=earthexplorer.usgs.gov>USGS Earth Explorer</a>");
addLayer(map2013, '2013', 'sat_2013', "Between 2006 and 2013, 9 new buildings and 1,142,023 square feet of office space were added to the NBP. In that time, Trailblazer was shut down after whistleblower Thomas Drake leaked documents about the program to the press. Drake faced prosecution from the U.S. government under the Espionage Act for his whistleblowing. Images via <a href=http://mapbox.com>Mapbox</a>.");
addLayer(bldgs, 'Building Details', 'bldgs', "COPT used to have a full inventory of all its properties with square footage on its website. It has since been removed. This list of tenants is based on research from October and November of 2013. Click on the buildings to see more about specific tenants.");

//this is the thing that controls all the layers, it's important
function addLayer(layer, name, id, captionText) {
    //generating a key of layers so viewer can select to add and remove at will
    var item = document.createElement('li');
    var link = document.createElement('a');
    var caption = document.getElementById('info');
    item.className= 'nav';
    link.href = '#';
    link.innerHTML = name;
    link.id = id;

    item.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            this.className = 'nav clearfix';
            caption.style.display='none';
            caption.innerHTML = '';
        } else {
            map.addLayer(layer);
            this.className = 'nav active clearfix';
            caption.style.display='block';
            caption.innerHTML = '<p>'+captionText+'</p>';
        }
    };

    item.appendChild(link);
    ui.appendChild(item);
    var layer_ids= document.getElementsByTagName('a');
  
}

//navigation 
var pull = $('#pull');
var nav = $('#ui-info');

navHeight  = nav.height();

$(pull).on('click', function(e) {  
        e.preventDefault();  
        nav.slideToggle();  
    }); 

$(window).resize(function(){  
    var w = $(window).width();  
    if(w > 320 && nav.is(':hidden')) {  
        nav.removeAttr('style');
    }  
});  

//hashing
var hash = new L.Hash(map);