function changeSiteColour() {
     var html = document.querySelector("html");
     var checkbox = document.querySelector("#header .toggle input");
     var slider = document.querySelector("#header .toggle #slider");
     if (checkbox.checked === true) {
          html.setAttribute("colour-mode", "light");
          slider.innerHTML = "&#x263C" //Unicode for sun icon
          localStorage.setItem("colour-mode", "light");
     }
     else {
          html.setAttribute("colour-mode", "dark");
          slider.innerHTML = "&#x263E" //Unicode for moon icon
          localStorage.setItem("colour-mode", "dark");
     }
}
