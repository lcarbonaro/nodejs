$(document).ready(function(){

	var serverUrl = 'http://example-lcarbonaro.c9users.io';

    $.get(serverUrl+'/data', function(resp) {
    	var data =resp;
    	data.forEach( function(item){
    		$('div#content').append('<li id="'+item._id+'">'+item.name+' ('+item.major+')</li>');
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


    $('div#content').on('click', 'li', function(){

    	var studentId = $(this).attr('id');

    	$.get(serverUrl+'/student/'+studentId, function(resp){

    		var rec = resp[0];  // resp will be array of one record

            // https://github.com/janl/mustache.js
    		var rendered = Mustache.render( $('template#tmpForm').html() , rec );

    		$('div#content3').html(rendered);

    	});

    });


    $('div#content3').on('click','button#btnUpdate', function(){

    	$.get(serverUrl+'/update', $('form#frmUpdate').serializeArray(), function(resp){

    		if(resp.ok===1){
    			$('div#content3').html('<span>Updated successfully!</span>')
    			$('div#content3 span').fadeOut(2000);
    		}

    	});
    
    });


});