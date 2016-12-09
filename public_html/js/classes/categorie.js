/*
    Ceci est equivalent à une classe Java, on veut faire propre!
 */
var Category = function (categorie) {
    this.id = ko.observable(categorie.id);
    this.nom = ko.observable(categorie.nom);
    this.description = ko.observable(categorie.description);
};