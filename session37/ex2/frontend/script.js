/* global $ */
/* global google */
/* global bootbox */

$(document).ready(function () {

    var lng, lat;
    var map;

    var $divSearch = $('#divSearch');    
    
    $divSearch.on('click', 'button#btnShowMap', function () {
        var location = $divSearch.find('#txtLocation').val();

        if (location === '') {
            bootbox.alert("Please enter a location!");
        } else {
            // set up and use your own Google API key here: https://console.developers.google.com
            var googleAPIKey = 'your-own-google-api-key-here';   
            var googleAPIUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
            var googleParms = {
                "address": location,
                "key": googleAPIKey
            };

            // draw basic map with centre point
            $.get(googleAPIUrl, googleParms, function (resp) {                
                var div = document.getElementById('divMap');
                div.innerHTML = '';  // clear out any previous map

                if (resp.status === 'OK') {
                    lat = resp.results[0].geometry.location.lat;
                    lng = resp.results[0].geometry.location.lng;
                    var pos = new google.maps.LatLng(lat, lng);

                    var mapProperties = {
                        "center": pos,
                        "zoom": 12,
                        "mapTypeId": google.maps.MapTypeId.ROADMAP
                    };
                    
                    map = new google.maps.Map(div, mapProperties);

                    var marker = new google.maps.Marker({
                        "position": pos,
                        "icon": {
                            "path": google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                            "scale": 6,
                            "strokeWeight": 4,
                            "strokeColor": "#FF0000"
                        },
                        "map": map
                    }); // marker
                    
                    var parms = {
                         "lng": lng,
                         "lat": lat
                    };

                    // search and display ward boundary
                    $.get('http://use-own-server-url-here/', parms, function(resp){
                        if ( resp.features.length === 0 ) {
                            bootbox.alert("Location outside dataset boundaries!");
                        } else {
                            map.data.addGeoJson(resp);
                            var title = 'Ward: ' + resp.features[0].properties.CENTROID;
                            title += ' Councillor: ' + resp.features[0].properties.COUNCILLOR;
                            marker.setTitle(title);
                        }                        
                    });
    
                } else {
                    bootbox.alert("Location not found!");
                } // if (resp.status === 'OK')

            }); // $.get(googleAPIUrl, googleParms, function (resp)

        } //  if (location === '')

    }); // $divSearch.on('click', 'button#btnShowMap',

});  // $(document).ready(function ()