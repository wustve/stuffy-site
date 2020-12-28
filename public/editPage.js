function editPage() {
     var div = document.querySelector("#content-wrapper");
     var form = div.querySelector("#edit-form-temp");
     var info = div.querySelector("#info-wrapper");
     var title = div.querySelector("#main-title");
     div.append(form.content.cloneNode(true));
     var formChildren = div.querySelector("#edit-form form").children;
     var i;
     for (i = 0; i < formChildren.length; i++) {
          if (formChildren[i].name === "name") {
               formChildren[i].value = title.querySelector("h1").innerHTML;
          }
          else if (formChildren[i].name === "image") {
               formChildren[i].value = info.querySelector("#image-div img").src;
          }
          else {
               try {
                    formChildren[i].value = info.querySelector(("#paragraphs #").concat(formChildren[i].name)).innerHTML;
               }
               catch {
                    continue
               }
          }
     }
     info.setAttribute("class", "hidden");
     title.setAttribute("class", "hidden");
}

function cancelEdit() {
     var div = document.querySelector("#content-wrapper");
     var info = div.querySelector("#info-wrapper");
     var title = div.querySelector("#main-title");
     var form = div.querySelector("#edit-form");
     info.removeAttribute("class");
     title.setAttribute("class", "title");
     form.remove();
}


$(document).ready(function () {
     console.log("ready!")
     $("#edit").click(function () {
          $("#edit-form form").submit(function (event) {
               event.preventDefault();
               console.log("submit!")
               $.ajax({
                    url: $(location).attr('href'),
                    method: "POST",
                    data: $('form').serialize(),
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
          $("#deleteStuffy").click(function () {
               if (confirm("Are you sure you want to delete" + " " + $("h1").text() + " (" + $("#animalType").text() + ")?")) {
                    $.ajax({
                         url: $(location).attr('href'),
                         method: "DELETE",
                         success: function (response) {
                              $('#status').text(response)
                              if (response == "Success"){   
                                   location.replace('/')
                              }
                              
                         }
                    })
               }    
          })
     });
})
