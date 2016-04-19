$(document).ready(function() {
    $.get('https://meetup-backend-lcarbonaro.c9users.io:8081/data', function(resp) {
        var data = JSON.parse(resp);
        $('div').html('Server data says that name is ' + data.name);
    });
});