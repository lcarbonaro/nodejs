$(document).ready(function() {

    $('#btnHome').on('click', showHomePage);
    $('#btnClients').on('click', showClientsPage);
    
    $('div').on('click', 'li', showClientImage);
    
    function showHomePage() {
        $.get('http://meetup-backend.lcarbonaro.c9users.io:8081/', function(resp){
            $('div').html(resp);
        });
    }
    
    function showClientsPage() {
        $.get('http://meetup-backend.lcarbonaro.c9users.io:8081/clients', function(resp){
            var data = resp; // was: JSON.parse(resp);
            $('div').html('<ul></ul>');
            data.forEach( function(c) {
                $('div ul').append('<li id="' + c.id + '">' + c.name + '</li>');
            });
        });
    }
    
    function showClientImage() {
        $.get('http://meetup-backend.lcarbonaro.c9users.io:8081/client', {"id":this.id} , function(resp){
            var data = resp; // was: JSON.parse(resp);
            data.forEach( function(c) {
                $('div').html('<img src="' + c.pic + '" />');
            });
        });
    }

});
