var ViewModelLivre = function (livres) {
    var self = this;
    this.filter = ko.observable();
    
    self.livres = ko.observableArray(ko.utils.arrayMap(livres, function (livre) {
        return new Book(livre);
    }));
    
    self.currentFilter = ko.observable();
    
    self.filterLivres = ko.computed(function() {
       if(!self.filter()) {
           return self.livres();
       } else {
           return ko.utils.arrayFilter(self.livres(), function(livre) {
              var livreTitre = ko.toJS(livre.titre);
              var livreResume = ko.toJS(livre.resume);
              return livreTitre.startsWith(self.filter()) || livreResume.startsWith(self.filter());
           });
       }
    });
    
    self.add = function () {
        self.livres.push({
            id : "",
            titre : "",
            resume : "",
            isbn : "",
            categorie : "",
            quantite : "",
            photo : "",
            published : "",
            ecrit : ""
        });
    };

    self.remove = function (livre) {
        self.livres.remove(livre);
        $.ajax({
            url: ["http://localhost:8080/biblio/webresources/livre/"+ko.toJS(livre.id)],
            type: "DELETE",
            contentType: "application/json",
            headers: {
                Accept : "application/json"
            }
        });
    };
    self.update = function (livre) {
        // Si l'id de la Categorie n'est pas reconnu alors on l'ajout Sinon on le met a jour.
        if(ko.toJS(livre.id) === "") {
            //console.log(self.categories[ko.toJS(categorie.id)])
            $.ajax({
                url: ["http://localhost:8080/biblio/webresources/livre/"],
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                headers: {
                    Accept : "application/json"
                },
                data: {
                    titre: ko.toJS(livre.titre),
                    resume: ko.toJS(livre.resume),
                    isbn: ko.toJS(livre.isbn),
                    categorie: ko.toJS(livre.categorie),
                    quantite: ko.toJS(livre.quantite),
                    photo: ko.toJS(livre.photo),
                    published: ko.toJS(livre.published),
                    ecrit: ko.toJS(livre.ecrit)
                }
            });
            window.location.reload();
        } else {
            self.livres.replace(self.livres[ko.toJS(livre.id)], livre);
            $.ajax({
                url: ["http://localhost:8080/biblio/webresources/livre/"+ko.toJS(livre.id)],
                type: "PUT",
                contentType: "application/x-www-form-urlencoded",
                headers: {
                    Accept : "application/json"
                },
                data: {
                    titre: ko.toJS(livre.titre),
                    resume: ko.toJS(livre.resume),
                    isbn: ko.toJS(livre.isbn),
                    categorie: ko.toJS(livre.categorie),
                    quantite: ko.toJS(livre.quantite),
                    photo: ko.toJS(livre.photo),
                    published: ko.toJS(livre.published),
                    ecrit: ko.toJS(livre.ecrit)
                }
            });
        }
    };
};