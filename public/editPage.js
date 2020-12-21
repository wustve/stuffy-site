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
     info.remove();
     title.remove();
}