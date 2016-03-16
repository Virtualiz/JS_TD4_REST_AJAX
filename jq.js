/**
 * Created by Bruno on 07/03/2016.
 */
var prolunch = {modules : {}};

prolunch.modules.itemManager = (function () {
    return {
        registerGetPlatHandler : function (plat, e) {

        },
        registerBackToListHandler : function () {

        },

        service : (function () {
            return {
                getResource : function (uri, callback) {

                }
            }
        }) (),

        view : (function () {
            return {
                displayPlat : function (data) {
                    var id = data.plat.id;
                    var nom = data.plat.nom;
                    var description = data.plat.description;
                    var prix = data.plat.prix;
                    var res = "<div class=\"col-sm-6 col-md-4 col-lg-4\"> <div class=\"thumbnail\"> <img class=\"img-rounded img-responsive\" src=\"https://webetu.iutnc.univ-lorraine.fr/www/canals5/prolunch/images/original/boeufChampignonsNoirs.jpg\" alt=\"...\"> <div class=\"caption text-center\"> <h3>Titre vraiment très très très très très très très long</h3> <p>Description du plat qui se trouve être plutôt très très très très très très très très très très longue.</p> <p><a href=\"#\" class=\"btn btn-primary\" role=\"button\">Ajouter au panier <span class=\"badge\">6.20€</span></a></p> </div> </div> </div>";
                },
                displayListe : function (data) {

                }
            }
        }) ()
    }
}) ();


prolunch.init = function () {

};

var lePlat = {
    plat: {
        id: 4,
        nom: "Donkey Kong Pizza ",
        description: "Sauce Barbecue, mozzarella, Tomate, Chorizo, Pepperoni.",
        prix: "12.00",
        photo: {
            href: "/images/original/Pizza_donkey.jpg"
        },
        id_resto: 1,
        type: "plat"
    },
    _links: {
        resto: "/plats/4/resto"
    }
};

prolunch.modules.itemManager.view.displayPlat(lePlat);