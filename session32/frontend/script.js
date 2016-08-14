$(document).ready(function(){

    
    $.get('http://practice-lcarbonaro.c9users.io/data', function(resp){
        
        var data = JSON.parse(resp);
        $('div#content').html('<ul></ul>');
        data.forEach(function(item){

        	$('div#content ul').append('<li>'+item.name+' ('+item.major+')</li>');

        });


    });


});