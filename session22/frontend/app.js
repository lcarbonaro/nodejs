$(document).ready(function() {
    $.get('http://meetup-backend-lcarbonaro.c9users.io:8081', function(resp) {
        var data = JSON.parse(resp);
        $('div').html('Server data says that name is ' + data.name);
    });
});