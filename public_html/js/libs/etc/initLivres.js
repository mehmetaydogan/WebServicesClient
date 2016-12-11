$(document).ready(function(){
    $.getJSON('http://localhost:8080/biblio/webresources/livre/', function(livres) {
        var categorieId = GetURLParameter('categorie');
        if(categorieId !== undefined) {
            for(var i = livres.length; i--;){
                if (livres[i].categorie.id != categorieId) livres.splice(i, 1);
            }
        }
        ko.applyBindings(new ViewModelLivre(livres));
    });
    $('#myTable').DataTable();
});

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1];
        }
    }
};

