function editPage1(id) {
     var div = document.querySelector(("#content-wrapper #info-wrapper #paragraphs #").concat(id));
     var para = div.querySelector("p");
     var button = div.querySelector(".title button")
     var input = document.createElement("textarea");
     input.value = para.innerHTML;
     para.setAttribute("class", "hidden");
     button.setAttribute("class", "hidden");
     div.appendChild(input);
}

function editPage() {
     var form = document.querySelector("#content-wrapper #edit-form");     
     var info = document.querySelector("#content-wrapper #info-wrapper");
     var title = document.querySelector("#content-wrapper #main-title");
     var div = document.querySelector("#content-wrapper");
     div.appendChild(form.content);
     var formChildren = div.querySelector("form").children;
     var paragraphs = info.querySelector("#paragraphs").children;
     var i;
     for (i = 0; i < 2; i++) {
          if (formChildren[i].id === "name-input") {
               formChildren[i].value = title.querySelector("h1").innerHTML;
          }
          else if (formChildren[i].id === "image-input") {
               formChildren[i].value = info.querySelector("#image img").getAttribute("src");
          }
          else {
               
          }
     }
     info.remove();
     title.remove();
}