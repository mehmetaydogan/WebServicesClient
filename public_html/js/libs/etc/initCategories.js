$(document).ready(function(){
    $.getJSON('http://localhost:8080/biblio/webresources/categorie/', function(categories) {
        //console.log(categories);
        /*
            Cette fonction est le controlleur de la vue 
            Elle assure la communication entre la vue et le modèle, une sorte de pont quoi! 
        */
        ko.applyBindings(new ViewModel(categories));
    });
    $('#myTable').DataTable();
});


