function editPage() {
     var form = document.querySelector("#content-wrapper #edit-form");
     var info = document.querySelector("#content-wrapper #info-wrapper");
     var title = document.querySelector("#content-wrapper #main-title");
     var div = document.querySelector("#content-wrapper");
     div.appendChild(form.content);
     info.remove();
     title.remove();
}