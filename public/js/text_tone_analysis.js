
// this is the id of the form
$("#text_tone_analysis_form").submit(function(e) {

        var message = $("#message").val();
           
        if( message ===''){
            alert("Please fill message...!!!!!!");       
        }else{
            document.getElementById("input_message").value =message;
            $("#message").val('');
            $.ajax({
                   type: $("#text_tone_analysis_form").attr('method'),
                   url: $("#text_tone_analysis_form").attr('action'),
                   data: {message}, // serializes the form's elements.
                   success: function(data)
                   {
                    document.getElementById("output_message").value =JSON.stringify(data,undefined,2);
                       
                   },
                   error: function (data) {                                     
                       document.getElementById("output_message").value =JSON.stringify(data,undefined,2);
                   }
            });
        }
        
           
        e.preventDefault(); // avoid to execute the actual submit of the form.
    });