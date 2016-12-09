var ViewModel = function (categories) {
    var self = this;
    /*
        Représente la liste des catégories
        La fonction prend la réponse obtenue du serveur en paramètre
        Ici nous supposons que vous avez chargé la liste des catégories
        ko.utils.arrayMap itère sur la collection et pour chaque objet trouvé, elle crée une instance de categorie 
    */
    self.categories = ko.observableArray(ko.utils.arrayMap(categories, function (categorie) {
        return new Category(categorie);
    }));
    
    self.remove = function (categorie) {
        self.categories.remove(categorie);
        $.ajax({
            url: [URI],
            type: "DELETE",
            contentType: "application/json",
            headers: {
                Accept: "application/json"
            }
        }).success(function (data, status, jq) {
            // alert(status);
            self.categories.remove(categorie);
        }).error(function (jq, status, error) {
            $(".error").text(JSON.stringify(status + " " + error));
        });
    };
    
    self.update = function (categorie) {
        //Effectuez votre requête AJAX ici
    };
};