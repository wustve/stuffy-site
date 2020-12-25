$('document').ready(function(){
    $('form').submit(function(event){
        event.preventDefault()
        $.ajax({
            url: $('location').attr('href'),
            method: "POST",
            data: $('form').serialize(),
            success: function(response, status){
                $('#status').text(response)
                if (status == 200){
                    location.replace("/")
                }
            }
        })
    })
})