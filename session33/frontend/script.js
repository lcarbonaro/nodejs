$(document).ready(function(){
    
    // change this to your own server url
    var serverUrl = 'http://example-lcarbonaro.c9users.io';

    $.get( serverUrl + '/data', function(resp){        
        
        var $div = $('div#content');
        $div.append('<h1>Student List</h1>');
        var $list = $('<ul>');       
        
        resp.forEach( function(item){
            $list.append('<li>'+item.name+' ('+item.major+')</li>');
        });
        
        $list.appendTo($div);

    });
    
    $.get( serverUrl + '/majors', function(resp) {
        
        var $div = $('div#content2');
        var $sel = $('<select>');       
        
        $sel.append('<option>Select a major...</option>');
        
        resp.forEach( function(item){
            $sel.append('<option>'+item+'</option>');
        });

        $sel.appendTo($div);
        
    });

    $('div#content2').on('change','select', function(e){
    	
    	var major =  $(this).val();
        
        $.get( serverUrl + '/names/'+major, function(resp){        
            var $div = $('div#content2');
            
            $('div#content2 ul').remove();  // remove any previous list

            var $list = $('<ul>');       
        
            resp.forEach( function(item){
                $list.append('<li>'+item.name+'</li>');
            });

            $list.appendTo($div);
        
        });
        
    });
    
});