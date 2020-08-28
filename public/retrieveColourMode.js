var colourMode = localStorage.getItem("colour-mode");
console.log(colourMode)
if (colourMode !== null) {
     var html = document.querySelector("html");
     html.setAttribute("colour-mode", colourMode);
}

function setCheckboxColourMode() {
     var checkbox = document.querySelector("#header .toggle input");
     if (colourMode === "dark") {
          checkbox.removeAttribute("checked")
     }
     else if (colourMode === "light") {
          checkbox.setAttribute("checked", "true")
     }
}