function filter(){
    var input, container, options;
    input = document.getElementById('searchBar').value
    input = input.toLowerCase()
    container = document.getElementById('selection')
    options = container.getElementsByTagName('a')
    for (let i = 0; i<options.length;i++){
        if (options[i].innerHTML.toLowerCase().indexOf(input) != -1){
            options[i].style.display = '';
        } else{
            options[i].style.display = 'none';
        }
    }
}