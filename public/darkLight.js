
function changeSiteColour() {
     var html = document.querySelector("html");
     var button = document.querySelector("#header button");
     if (button.className === "darkMode") {
          html.setAttribute("colour-mode", "light");
          button.setAttribute("class", "lightMode");
          button.innerHTML = "Dark Mode"
          localStorage.setItem("colour-mode", "light");
     }
     else if (button.className == "lightMode") {
          html.setAttribute("colour-mode", "dark");
          button.setAttribute("class", "darkMode");
          button.innerHTML = "Light Mode"
          localStorage.setItem("colour-mode", "dark");
     }
}
