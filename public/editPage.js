function editPage() {
     var div = document.querySelector("#content-wrapper");
     var form = div.querySelector("#edit-form-temp");     
     var info = div.querySelector("#info-wrapper");
     var title = div.querySelector("#main-title");
     div.appendChild(form.content);
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
     var formTemplate = div.querySelector("#edit-form-temp");  
     var info = div.querySelector("#info-wrapper");
     var title = div.querySelector("#main-title");
     var form = div.querySelector("#edit-form");
     info.removeAttribute("class");
     title.setAttribute("class", "title");
     formTemplate.appendChild(form);
     form.remove();
}