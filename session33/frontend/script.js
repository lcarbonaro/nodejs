$(document).ready(function(){

	var serverUrl = 'http://example-lcarbonaro.c9users.io';

    $.get(serverUrl+'/data', function(resp) {
    	var data =resp;
    	data.forEach( function(item){
    		$('div#content').append('<li>'+item.name+' ('+item.major+')</li>');
    	});
    });

    $.get(serverUrl+'/majors', function(resp){
        
        var sel = $('<select>');
        sel.append('<option>Select a major...</option>')

        var data = resp;

        data.forEach( function(item){

        	sel.append('<option>'+item+'</option>')

        });

        $('div#content2').append(sel);


    });


    $('div#content2').on('change','select', function(){
        
        var selMajor = $(this).val();

        $.get(serverUrl+'/names/'+selMajor, function(resp){
        	var data =resp;
        	$('div#content2 ul').remove();

        	var list = $('<ul>');

       	    data.forEach( function(item){
    		    list.append('<li>'+item.name+'</li>');
    	    });

    	    $('div#content2').append(list);

        });

    });


});