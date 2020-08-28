function changeSiteColour(checkbox) {
     var html = document.querySelector("html");
     var checkbox = document.querySelector("#header .toggle input");
     if (checkbox.checked === true) {
          html.setAttribute("colour-mode", "light");
          localStorage.setItem("colour-mode", "light");
     }
     else if (checkbox.checked === false) {
          html.setAttribute("colour-mode", "dark");
          localStorage.setItem("colour-mode", "dark");
     }
}
