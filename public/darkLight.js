function changeSiteColour(checkbox) {
     var html = document.querySelector("html");
     var checkbox = document.querySelector("#header .toggle input");
     var slider = document.querySelector("#header .toggle #slider");
     if (checkbox.checked === true) {
          html.setAttribute("colour-mode", "light");
          slider.innerHTML = "&#x263C"
          localStorage.setItem("colour-mode", "light");
     }
     else if (checkbox.checked === false) {
          html.setAttribute("colour-mode", "dark");
          slider.innerHTML = "&#x263E"
          localStorage.setItem("colour-mode", "dark");
     }
}
