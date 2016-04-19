$(document).ready(function() {

    $('#btnHome').on('click', function(){
        $.get('http://meetup-backend.lcarbonaro.c9users.io:8081', function(resp){
            $('div#list').html(resp);
            $('div#image').html('');
        });
    });


    $('#btnClients').on('click', function(){
        $.get('http://meetup-backend.lcarbonaro.c9users.io:8081/clients', function(resp){
            var data = JSON.parse(resp);
            $('div#list').html('<ul></ul>');
            data.forEach( function(c) {
                $('div#list ul').append('<li class="imagelink" id="' + c.id + '">' + c.name + '</li>');
            });
        });
    });
    

    $('#btnProducts').on('click', function(){
        $.get('http://meetup-backend.lcarbonaro.c9users.io:8081/products', function(resp){
            var data = JSON.parse(resp);
            $('div#list').html('<ul></ul>');
            data.forEach( function(p) {
                $('div#list ul').append('<li>' + p.name + '</li>');
            });
        });
    });
    

    $('div#list').on('click', 'li.imagelink', function(){
        $.get('http://meetup-backend.lcarbonaro.c9users.io:8081/client', {"id":this.id} , function(resp){
            var data = JSON.parse(resp);
            data.forEach( function(c) {
                $('div#image').html('<img src="' + c.pic + '" />');
            });
        });
    });

});
