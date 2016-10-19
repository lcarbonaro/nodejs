/* global $ */
/* global google */
/* global bootbox */

$(document).ready(function () {

    var lng, lat;
    var map;

    var $divSearch = $('#divSearch');    
    var $divSearchLayer = $('#divSearchLayer');

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

                if (resp.status === 'OK') {
                    lat = resp.results[0].geometry.location.lat;
                    lng = resp.results[0].geometry.location.lng;
                    var pos = new google.maps.LatLng(lat, lng);

                    var mapProperties = {
                        "center": pos,
                        "zoom": 17,
                        "mapTypeId": google.maps.MapTypeId.ROADMAP
                    };

                    var div = document.getElementById('divMap');
                    map = new google.maps.Map(div, mapProperties);

                    var marker = new google.maps.Marker({
                        "position": pos,
                        "icon": {
                            "path": google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                            "scale": 10,
                            "strokeWeight": 4,
                            "strokeColor": "#FF0000"
                        },
                        "map": map
                    }); // marker

                    // populate drop-down for landmark types
                    $.get('http://use-own-server-url-here/types', function (types) {
                        var sel = $('<select>');
                        sel.attr('id', 'selLandmarkType');
                        sel.attr('class', 'form-control input-lg');
                        sel.append('<option value="0">Select a landmark type...</option>');

                        types.forEach(function (type) {
                            sel.append('<option value="' + type + '">' + type + '</option>')
                        });

                        $('span#spnSelect').html('').append(sel);
                        $('#txtDistance').val('');
                        $divSearchLayer.fadeIn(1000);
                    });  // $.get('..../types', etc.)

                } else {

                    bootbox.alert("Location not found!");

                } // if (resp.status === 'OK')

            }); // $.get(googleAPIUrl, googleParms, function (resp)

        } //  if (location === '')

    }); // $divSearch.on('click', 'button#btnShowMap',


    $divSearchLayer.on('click', 'button#btnSearch', function () {
        var type = $('#selLandmarkType').val();
        var dist = $('#txtDistance').val();

        if (type === '' || dist === '') {
            bootbox.alert('Please select landmark type and distance!');
        } else {
            var parms = {
                "lng": lng,
                "lat": lat,
                "type": type,
                "dist": dist
            };

            $.get('http://use-own-server-url-here/search', parms, function (resp) {
                // to clear out any previous data layer features from a previous search                
                map.data.forEach(function(feature) {
                    map.data.remove(feature);
                });
                
                if (resp.features.length === 0) {
                    bootbox.alert('No matching landmarks found!');
                } else {
                    map.data.addGeoJson(resp);
                    // style landmark points (smaller blue arrows)
                    map.data.setStyle(function (feature) {
                        return {
                            "title": feature.getProperty('LANDMARKNA'),
                            "icon": {
                                "path": google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                                "scale": 5,
                                "strokeWeight": 2,
                                "strokeColor": "#0000FF"
                            }
                        };
                    }); // setStyle()

                }  // if (resp.features.length === 0

            }); // $.get('.../search', etc. etc.)
        } // if type or distance blank

    }); // $divSearchLayer.on('click', 'button#btnSearch'

});  // $(document).ready(function ()