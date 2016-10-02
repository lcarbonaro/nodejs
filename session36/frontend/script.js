/* global $ */
/* global google */

$(document).ready(function() {

    var lng, lat;

    // Mississauga Central Library
    lng = -79.6436414;
    lat = 43.5875534;

    var pos = new google.maps.LatLng(lat, lng);

    var mapProperties = {
        "center": pos,
        "zoom": 17,
        "mapTypeId": google.maps.MapTypeId.ROADMAP
    };

    var div = document.getElementById('divMap');
    var map = new google.maps.Map(div, mapProperties);

    var marker = new google.maps.Marker({
        "position": pos,
        "icon": {
            "path": google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            "scale": 10,
            "strokeWeight":4,
            "strokeColor":"#FF0000"
        },
        "map": map
    });

    $.get('http://mapexample-lcarbonaro.c9users.io/', function(resp){
       map.data.addGeoJson(resp);
       map.data.setStyle(function(feature) {
           return {
               "title": feature.getProperty('LANDMARKNA'),
               "icon": {
                   "path": google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                   "scale": 5,
                   "strokeWeight":2,
                   "strokeColor":"#0000FF"
                },
           };
       });
    });


});
