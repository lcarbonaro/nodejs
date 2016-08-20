$(document).ready(function(){
    
    // change this to your own server address
    var serverUrl = 'http://example-lcarbonaro.c9users.io';  
    
    $.get( serverUrl + '/data', function(resp){        
        
        var data = JSON.parse(resp);
        
        var $div = $('div#content');
        $div.append('<h1>Student List</h1>');
        var $list = $div.append('<ul></ul>');       
        
        data.forEach( function(item){
            $list.append('<li>'+item.name+'</li>');
        });
        
    });
    
});