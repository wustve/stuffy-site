function editPage(id) {
     var div = document.querySelector(("#content-wrapper #info-wrapper #paragraphs #").concat(id));
     var para = div.querySelector("p");
     var button = div.querySelector(".title button")
     var input = document.createElement("textarea");
     input.value = para.innerHTML;
     para.setAttribute("class", "hidden");
     button.setAttribute("class", "hidden");
     div.appendChild(input);
}