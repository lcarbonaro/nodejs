$(document).ready(function() {
    
    var baseUrl = 'http://meetup-backend.lcarbonaro.c9users.io';  // change this accordingly
    
    getCategories();
    
    $('#txtAmount').focus();

    $('#btnExpense').on('click', saveExpense);
    $('#btnSummary').on('click', getSummary);
    
    
    function getCategories() {
        $.get(baseUrl + '/categories', function(resp){
            var data = JSON.parse(resp);
            data.forEach( function(c) {
                $('select').append('<option value="' + c.id + '">' + c.name + '</option>');
            });
        });
    }
    
    
    function saveExpense() {
        var category = $('#selCategory').val(),
            amount   = $('#txtAmount').val();
        $.get(baseUrl + '/expense', {"amount":amount, "category":category} , function(resp){
            $('#txtAmount').val('').focus();
            $('#msg').text('Expense record saved').fadeIn(1500).fadeOut(2500);
            getSummary();
        });
    }
    
    
    function getSummary() {
        $.get(baseUrl + '/summary', function(resp){
            var data = JSON.parse(resp);
            $('div').html('<ul></ul>');
            data.forEach( function(c) {
                $('div ul').append('<li>' + c.name + ': $' + (c.total===null ? 0 : c.total) + '</li>');
            });
        });
    }

});
