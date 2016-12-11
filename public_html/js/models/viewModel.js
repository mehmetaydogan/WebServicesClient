var ViewModel = function (categories) {
    var self = this;
    this.filter = ko.observable();
    /*
        Représente la liste des catégories
        La fonction prend la réponse obtenue du serveur en paramètre
        Ici nous supposons que vous avez chargé la liste des catégories
        ko.utils.arrayMap itère sur la collection et pour chaque objet trouvé, elle crée une instance de categorie 
     */
    self.categories = ko.observableArray(ko.utils.arrayMap(categories, function (categorie) {
        return new Category(categorie);
    }));
    
    self.currentFilter = ko.observable();
    
    self.filterCategories = ko.computed(function() {
       if(!self.filter()) {
           return self.categories();
       } else {
           return ko.utils.arrayFilter(self.categories(), function(categorie) {
              var categorieNom = ko.toJS(categorie.nom);
              var categorieDescription = ko.toJS(categorie.description);
              return categorieNom.startsWith(self.filter()) || categorieDescription.startsWith(self.filter());
           });
       }
    });
    
    self.books = function (categorie) {
        document.location.href = "ListeLivres.html?categorie="+ko.toJS(categorie.id);
    };
    
    self.add = function () {
        self.categories.push({
            id : "",
            nom : "",
            description : ""
        });
    };

    self.remove = function (categorie) {
        self.categories.remove(categorie);
        $.ajax({
            url: ["http://localhost:8080/biblio/webresources/categorie/"+ko.toJS(categorie.id)],
            type: "DELETE",
            contentType: "application/json",
            headers: {
                Accept : "application/json"
            }
        });
    };
    self.update = function (categorie) {
        // Si l'id de la Categorie n'est pas reconnu alors on l'ajout Sinon on le met a jour.
        if(ko.toJS(categorie.id) === "") {
            //console.log(self.categories[ko.toJS(categorie.id)])
            $.ajax({
                url: ["http://localhost:8080/biblio/webresources/categorie/"],
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                headers: {
                    Accept : "application/json"
                },
                data: {
                    nom: ko.toJS(categorie.nom),
                    description: ko.toJS(categorie.description)
                }
            });
            window.location.reload();
        } else {
            self.categories.replace(self.categories[ko.toJS(categorie.id)], categorie);
            $.ajax({
                url: ["http://localhost:8080/biblio/webresources/categorie/"+ko.toJS(categorie.id)],
                type: "PUT",
                contentType: "application/x-www-form-urlencoded",
                headers: {
                    Accept : "application/json"
                },
                data: {
                    nom: ko.toJS(categorie.nom),
                    description: ko.toJS(categorie.description)
                }
            });
        }
    };
};