$(document).ready(function(){

    $.get('http://example-lcarbonaro.c9users.io/data', function(resp) {

    	var data = JSON.parse(resp);

    	data.forEach( function(item){

    		$('div#content').append('<li>'+item.name+'</li>');

    	});

    });

});