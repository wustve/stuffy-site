$("document").ready(function () {
     $("#edit-form form").submit(function (event) {
          event.preventDefault();
          $.ajax({
               url: "/add-stuffy",
               method: "POST",
               data: $("#edit-form form").serialize(),
               success: function (response) {
                    $('#status').text(response.msg)
                    if (response.msg == "Success") {
                         if (location.pathname + "#active" == response.url) {
                              location.reload()
                         } else {
                              location.replace(response.url)
                         }
                    }
               }
          })
     })
})