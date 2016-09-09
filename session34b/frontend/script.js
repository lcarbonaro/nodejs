$(document).ready(function() {

    var rec = {
        "_id": "987654321abdced98765432",
        "name": "Fred",
        "major": "Comp",
        "fulltime": false,
        "oncampus": {"radio": [
            {"val": "Y", "txt": "Yes"},
            {"val": "N", "txt": "No"},
            {"val": "S", "txt": "Sometimes"},
            {"val": "D", "txt": "Don't Know"}
        ]},
        "likes": {"options": [
            {"val": "Music", "txt": "Music"},
            {"val": "Sport", "txt": "Sport"},
            {"val": "Party", "txt": "Party"},
            {"val": "Books", "txt": "Books"}
        ]},
        "grades": [12, 23, 34]
    };

    // rec.oncampusY = rec.oncampus==='Y' ? true : false;
    // rec.oncampusN = rec.oncampus==='N' ? true : false;
    // rec.oncampusS = rec.oncampus==='S' ? true : false;

    // rec.likesMusic = rec.likes==='Music' ? true : false;
    // rec.likesSport = rec.likes==='Sport' ? true : false;
    // rec.likesParty = rec.likes==='Party' ? true : false;
    // rec.likesBooks = rec.likes==='Books' ? true : false;


    var template = $('#tmpForm').html();
    //console.log(template);
    var rendered = Mustache.render(template, rec);
    $('div#content').html(rendered);

    $('div#content').on('click', '#btnUpdate', function() {
        // console.log('in btn on-click');
        // console.log('will submit:');
        // console.log($('#frmUpdate').serializeArray());

        var formData = $('#frmUpdate').serializeArray();

        // validation
        if( formData.inpGrade==='' ) {

        } else {
            $.get('http://127.0.0.1:3000', formData , function(resp){

            });
        }



    });
});
