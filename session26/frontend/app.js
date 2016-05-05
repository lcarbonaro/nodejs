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
            $('#msg').text('Expense record saved').fadeIn(1500).fadeOut(2500);
        });
    }
    
    
    function getSummary() {
        $.get('http://meetup-backend.lcarbonaro.c9users.io:8081/summary', function(resp){
            var data = JSON.parse(resp);
            $('div').html('<ul></ul>');
            data.forEach( function(c) {
                $('div ul').append('<li>' + c.name + ': $' + (c.total===null ? 0 : c.total) + '</li>');
            });
        });
    }

});
