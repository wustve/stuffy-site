var colourMode = localStorage.getItem("colour-mode");
console.log(colourMode)
if (colourMode !== null) {
     var html = document.querySelector("html");
     html.setAttribute("colour-mode", colourMode);
}
else {
     colourMode = "dark";
     checkbox.removeAttribute("checked");

}

function setCheckboxColourMode() {
     var checkbox = document.querySelector("#header .toggle input");
     var slider = document.querySelector("#header .toggle #slider");
     if (colourMode === "dark") {
          checkbox.removeAttribute("checked");
          slider.innerHTML = "&#x263E";
     }
     else if (colourMode === "light") {
          checkbox.setAttribute("checked", "true");
          slider.innerHTML = "&#x263C";
     }
}