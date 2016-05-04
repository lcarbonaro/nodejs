$(document).ready(function() {
    
    getCategories();

    $('#btnExpense').on('click', saveExpense);
    $('#btnSummary').on('click', getSummary);
    
    
    function getCategories() {
        $.get('http://meetup-backend.lcarbonaro.c9users.io:8081/categories', function(resp){
            var data = JSON.parse(resp);
            data.forEach( function(c) {
                $('select').append('<option value="' + c.id + '">' + c.name + '</option>');
            });
        });
    }
    
    
    function saveExpense() {
        var category = $('#selCategory').val(),
            amount   = $('#txtAmount').val();
        $.get('http://meetup-backend.lcarbonaro.c9users.io:8081/expense', {"amount":amount, "category":category} , function(resp){
            console.log(resp);
        });
    }
    
    
    function getSummary() {
        $.get('http://meetup-backend.lcarbonaro.c9users.io:8081/summary', function(resp){
            var data = JSON.parse(resp);
            $('div').html('');
            data.forEach( function(c) {
                $('div').append('<p>'+c.name+': '+c.total+'</p>');
            });
        });
    }

});
