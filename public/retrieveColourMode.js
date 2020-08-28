var colourMode = localStorage.getItem("colour-mode");
console.log(colourMode)
if (colourMode !== null) {
     var html = document.querySelector("html");
     html.setAttribute("colour-mode", colourMode);
}

function setButtonColourMode() {
     var button = document.querySelector("#header button");
     if (colourMode === "dark") {
          button.setAttribute("class", "darkMode")
          button.innerHTML = "Light Mode"
     }
     else if (colourMode === "light") {
          button.setAttribute("class", "lightMode")
          button.innerHTML = "Dark Mode"
     }
}