var Book = function (livre) {
    this.id = ko.observable(livre.id);
    this.titre = ko.observable(livre.titre);
    this.resume = ko.observable(livre.resume);
    this.isbn = ko.observable(livre.isbn);
    if(livre.ecrit_par!=undefined) {
        this.categorie = ko.observable(livre.categorie.id);
    } else {
        this.categorie = ko.observable(livre.categorie);
    }
    this.quantite = ko.observable(livre.quantite);
    this.photo = ko.observable(livre.photo);
    this.published = ko.observable(livre.published);
    if(livre.ecrit_par!=undefined) {
        this.ecrit = ko.observable(livre.ecrit_par.id);
    } else {
        this.ecrit = ko.observable(livre.ecrit_par);
    }
};