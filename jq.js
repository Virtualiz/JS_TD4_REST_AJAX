/**
 * Created by Bruno on 07/03/2016.
 */
var prolunch = {modules : {},
                link : "https://webetu.iutnc.univ-lorraine.fr/www/canals5/prolunch/"};

prolunch.modules.itemManager = (function () {
    return {
        registerGetPlatHandler : function (plat, e) {

        },
        registerBackToListHandler : function () {

        },

        service : (function () {
            return {
                getResource : function (uri, callback) {
                    $.ajax({
                        url : uri,
                        type : 'GET',
                        dataType : 'json',
                        success : callback,
                        xhrFields : {
                            withCreditentials : true
                        },
                        crossDomain : true
                    })
                }
            }
        }) (),

        view : (function () {
            return {
                displayPlat : function (data) {
                    var id = data.id;
                    var nom = data.nom;
                    /*var description = data.description;*/
                    var prix = data.prix;
                    var link_pic = data.photo.href;
                    var res = "<div class=\"col-sm-6 col-md-4 col-lg-4\" id=\"" + id + "\"'> <div class=\"thumbnail\"> <img class=\"img-rounded img-responsive\" src=\"" + prolunch.link + link_pic + "\" alt=\"...\"> <div class=\"caption text-center\"> <h3>" + nom + "</h3>" + /* <p>"+description+"</p>*/"<p><a href=\"#\" class=\"btn btn-primary\" role=\"button\" id='b"+id+"'>Détails</a></p><p><a href=\"#\" class=\"btn btn-primary\" role=\"button\">Ajouter au panier <span class=\"badge\">" + prix + "</span></a></p></div> </div> </div>";
                    $("#container").append(res);
                    $("#b"+id).click(function(e){
                        e.preventDefault();
                        prolunch.modules.itemManager.service.getResource(prolunch.link+'plats/'+id,prolunch.modules.itemManager.view.displayDescr);
                        //reset le onclick
                        $("#b"+id).unbind("click");
                        $("#b"+id).click(function(e){
                            e.preventDefault();
                            $('#desc'+id).fadeToggle();
                        });
                    });
                },

                displayDescr : function(data){
                    var desc = data.plat.description;
                    $('#b'+data.plat.id).before("<p id='desc"+data.plat.id+"'>"+desc+"</p>");
                },
                displayListe : function (data) {
                    data.forEach(prolunch.modules.itemManager.view.displayPlat);
                }
            }
        }) ()
    }
}) ();


prolunch.init = function () {
    prolunch.modules.itemManager.service.getResource(prolunch.link+'plats/',prolunch.modules.itemManager.view.displayListe);
};

var lePlat = {

        id: 4,
        nom: "Donkey Kong Pizza ",
        description: "Sauce Barbecue, mozzarella, Tomate, Chorizo, Pepperoni.",
        prix: "12.00",
        photo: {
            href: "/images/original/Pizza_donkey.jpg"
        },
        id_resto: 1,
        type: "plat",

    _links: {
        resto: "/plats/4/resto"
    }
};

//prolunch.modules.itemManager.view.displayPlat(lePlat);
var data = [
    {
        "id": 1,
        "nom": "Classique",
        "prix": "8.00",
        "photo": {
            "href": "/images/small/pizza_classique.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/1"
            }
        },
        "type": "plat"
    },
    {
        "id": 2,
        "nom": "Koop-izz-a",
        "prix": "10.00",
        "photo": {
            "href": "/images/small/pizza_koopa.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/2"
            }
        },
        "type": "plat"
    },
    {
        "id": 3,
        "nom": "Pizza Peach",
        "prix": "11.00",
        "photo": {
            "href": "/images/small/pizza_peach.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/3"
            }
        },
        "type": "plat"
    },
    {
        "id": 4,
        "nom": "Donkey Kong Pizza ",
        "prix": "12.00",
        "photo": {
            "href": "/images/small/Pizza_donkey.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/4"
            }
        },
        "type": "plat"
    },
    {
        "id": 26,
        "nom": "Boeuf aux Champignons Noirs",
        "prix": "6.20",
        "photo": {
            "href": "/images/small/boeufChampignonsNoirs.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/26"
            }
        },
        "type": "plat"
    },
    {
        "id": 27,
        "nom": "Boeuf au Curry",
        "prix": "6.00",
        "photo": {
            "href": "/images/small/BoeufCurry.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/27"
            }
        },
        "type": "plat"
    },
    {
        "id": 28,
        "nom": "Poulet Ananas",
        "prix": "7.10",
        "photo": {
            "href": "/images/small/PouletAnanas.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/28"
            }
        },
        "type": "plat"
    },
    {
        "id": 29,
        "nom": "Porc aux legumes",
        "prix": "6.80",
        "photo": {
            "href": "/images/small/Porcauxlegumes.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/29"
            }
        },
        "type": "plat"
    },
    {
        "id": 30,
        "nom": "Riz Cantonais",
        "prix": "3.00",
        "photo": {
            "href": "/images/small/RizCantonais.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/30"
            }
        },
        "type": "plat"
    },
    {
        "id": 31,
        "nom": "Nouilles sautés au poulet",
        "prix": "6.00",
        "photo": {
            "href": "/images/small/NouillesPoulet.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/31"
            }
        },
        "type": "plat"
    },
    {
        "id": 32,
        "nom": "Légumes Chop-Suey",
        "prix": "5.00",
        "photo": {
            "href": "/images/small/LegumesChop-Suey.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/32"
            }
        },
        "type": "plat"
    },
    {
        "id": 53,
        "nom": "Maki Concombre",
        "prix": "4.00",
        "photo": {
            "href": "/images/small/MakiConcombre.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/53"
            }
        },
        "type": "plat"
    },
    {
        "id": 54,
        "nom": "Maki Saumon",
        "prix": "4.50",
        "photo": {
            "href": "/images/small/MakiSaumon.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/54"
            }
        },
        "type": "plat"
    },
    {
        "id": 55,
        "nom": "Maki California Saumon Avocat",
        "prix": "5.00",
        "photo": {
            "href": "/images/small/MakiCalifornia.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/55"
            }
        },
        "type": "plat"
    },
    {
        "id": 56,
        "nom": "Sushi Crevette (2 pièces)",
        "prix": "4.00",
        "photo": {
            "href": "/images/small/SushiCrevette.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/56"
            }
        },
        "type": "plat"
    },
    {
        "id": 57,
        "nom": " Sushi Thon (2 pièces)",
        "prix": "4.50",
        "photo": {
            "href": "/images/small/SushiThon.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/57"
            }
        },
        "type": "plat"
    },
    {
        "id": 58,
        "nom": "Sushi Anguille",
        "prix": "7.00",
        "photo": {
            "href": "/images/small/SushiAnguille.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/58"
            }
        },
        "type": "plat"
    },
    {
        "id": 59,
        "nom": "Yakitori Boulettes de Poulet",
        "prix": "3.00",
        "photo": {
            "href": "/images/small/YakitoriPoulet.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/59"
            }
        },
        "type": "plat"
    },
    {
        "id": 60,
        "nom": "Yakitori Boeuf au Fromage",
        "prix": "4.30",
        "photo": {
            "href": "/images/small/YakitoriBoeufFromage.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/60"
            }
        },
        "type": "plat"
    },
    {
        "id": 61,
        "nom": "Yakitori Champignons",
        "prix": "3.00",
        "photo": {
            "href": "/images/small/YakitoriChampignons.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/61"
            }
        },
        "type": "plat"
    },
    {
        "id": 62,
        "nom": "Perle de Coco",
        "prix": "3.00",
        "photo": {
            "href": "/images/small/PerledeCoco.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/62"
            }
        },
        "type": "plat"
    },
    {
        "id": 81,
        "nom": "Nougat chinois",
        "prix": "3.00",
        "photo": {
            "href": "/images/small/Nougat.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/81"
            }
        },
        "type": "plat"
    },
    {
        "id": 82,
        "nom": "El chili de los golosos",
        "prix": "10.90",
        "photo": {
            "href": "/images/small/Elchilidelosgolosos.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/82"
            }
        },
        "type": "plat"
    },
    {
        "id": 83,
        "nom": "Enchilado de queso",
        "prix": "9.50",
        "photo": {
            "href": "/images/small/Enchilado.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/83"
            }
        },
        "type": "plat"
    },
    {
        "id": 84,
        "nom": "Burrito poulet",
        "prix": "11.20",
        "photo": {
            "href": "/images/small/BurritoPoulet.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/84"
            }
        },
        "type": "plat"
    },
    {
        "id": 85,
        "nom": "Burrito boeuf",
        "prix": "9.90",
        "photo": {
            "href": "/images/small/Burritoboeuf.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/85"
            }
        },
        "type": "plat"
    },
    {
        "id": 86,
        "nom": "Fajitas boeuf",
        "prix": "13.50",
        "photo": {
            "href": "/images/small/Fajitasboeuf.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/86"
            }
        },
        "type": "plat"
    },
    {
        "id": 87,
        "nom": "Fajitas gambas",
        "prix": "17.00",
        "photo": {
            "href": "/images/small/Fajitasgambas.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/87"
            }
        },
        "type": "plat"
    },
    {
        "id": 88,
        "nom": "Las tostadas de la casa",
        "prix": "6.00",
        "photo": {
            "href": "/images/small/Lastostadasdelacasa.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/88"
            }
        },
        "type": "plat"
    },
    {
        "id": 89,
        "nom": "Nachos",
        "prix": "6.50",
        "photo": {
            "href": "/images/small/Nachos.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/89"
            }
        },
        "type": "plat"
    },
    {
        "id": 130,
        "nom": "Jambon Champignon",
        "prix": "12.50",
        "photo": {
            "href": "/images/small/pizza_Champi.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/130"
            }
        },
        "type": "plat"
    },
    {
        "id": 131,
        "nom": "Provençale",
        "prix": "12.50",
        "photo": {
            "href": "/images/small/Pizza_Provencale.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/131"
            }
        },
        "type": "plat"
    },
    {
        "id": 132,
        "nom": "Recursive",
        "prix": "11.00",
        "photo": {
            "href": "/images/small/pizza_recursive.jpeg"
        },
        "_links": {
            "self": {
                "href": "/plats/132"
            }
        },
        "type": "plat"
    },
    {
        "id": 133,
        "nom": "Aubergina",
        "prix": "13.00",
        "photo": {
            "href": "/images/small/Pizza_Aubergina.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/133"
            }
        },
        "type": "plat"
    },
    {
        "id": 134,
        "nom": "Schtroumpf",
        "prix": "13.00",
        "photo": {
            "href": "/images/small/pizza_schroumpf.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/134"
            }
        },
        "type": "plat"
    },
    {
        "id": 135,
        "nom": "Mexicaine",
        "prix": "12.00",
        "photo": {
            "href": "/images/small/Pizza_Mexicaine.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/135"
            }
        },
        "type": "plat"
    },
    {
        "id": 136,
        "nom": "Chorizone",
        "prix": "11.00",
        "photo": {
            "href": "/images/small/pizza_chorizon.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/136"
            }
        },
        "type": "plat"
    },
    {
        "id": 137,
        "nom": "Cyclopéenne",
        "prix": "12.00",
        "photo": {
            "href": "/images/small/pizza_oeuf.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/137"
            }
        },
        "type": "plat"
    },
    {
        "id": 138,
        "nom": "Poulégume",
        "prix": "14.00",
        "photo": {
            "href": "/images/small/pizza_poulegume.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/138"
            }
        },
        "type": "plat"
    },
    {
        "id": 140,
        "nom": "Sushi Poulpe",
        "prix": "5.50",
        "photo": {
            "href": "/images/small/SushiPoulpe.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/140"
            }
        },
        "type": "plat"
    },
    {
        "id": 142,
        "nom": "Sushi Avocat",
        "prix": "3.80",
        "photo": {
            "href": "/images/small/SushiAvocat.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/142"
            }
        },
        "type": "plat"
    },
    {
        "id": 143,
        "nom": "Sushi Oeufs de Saumon",
        "prix": "5.00",
        "photo": {
            "href": "/images/small/SushiOeufsdeSaumon.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/143"
            }
        },
        "type": "plat"
    },
    {
        "id": 144,
        "nom": "Temaki Saumon Avocat",
        "prix": "4.50",
        "photo": {
            "href": "/images/small/TemakiSaumonAvocat.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/144"
            }
        },
        "type": "plat"
    },
    {
        "id": 145,
        "nom": "Temaki Oeuf de Saumon",
        "prix": "6.00",
        "photo": {
            "href": "/images/small/TemakiOeuf.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/145"
            }
        },
        "type": "plat"
    },
    {
        "id": 146,
        "nom": "California Saumon Avocat",
        "prix": "4.50",
        "photo": {
            "href": "/images/small/CaliforniaSaumonAvocat.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/146"
            }
        },
        "type": "plat"
    },
    {
        "id": 149,
        "nom": "Maki Homard",
        "prix": "7.60",
        "photo": {
            "href": "/images/small/MakiHomard.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/149"
            }
        },
        "type": "plat"
    },
    {
        "id": 150,
        "nom": "Maki Wasabi",
        "prix": "6.00",
        "photo": {
            "href": "/images/small/MakiWasabi.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/150"
            }
        },
        "type": "plat"
    },
    {
        "id": 153,
        "nom": "Brochette Boulettes de Poulet",
        "prix": "3.50",
        "photo": {
            "href": "/images/small/BrochetteBoulettesdePoulet.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/153"
            }
        },
        "type": "plat"
    },
    {
        "id": 154,
        "nom": "Brochette Boeuf",
        "prix": "4.00",
        "photo": {
            "href": "/images/small/BrochetteBoeuf.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/154"
            }
        },
        "type": "plat"
    },
    {
        "id": 155,
        "nom": "Brochette Boeuf au Fromage",
        "prix": "4.00",
        "photo": {
            "href": "/images/small/BrochetteBoeufFromage.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/155"
            }
        },
        "type": "plat"
    },
    {
        "id": 156,
        "nom": "Sushi Thon",
        "prix": "4.50",
        "photo": {
            "href": "/images/small/SushiThon.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/156"
            }
        },
        "type": "plat"
    },
    {
        "id": 157,
        "nom": "Aloo Gobi",
        "prix": "12.95",
        "photo": {
            "href": "/images/small/Aloo_gobi.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/157"
            }
        },
        "type": "plat"
    },
    {
        "id": 158,
        "nom": "Poulet Tandoori ",
        "prix": "13.75",
        "photo": {
            "href": "/images/small/TandooriChicken.jpg"
        },
        "_links": {
            "self": {
                "href": "/plats/158"
            }
        },
        "type": "plat"
    }
];
//prolunch.modules.itemManager.view.displayListe(data);
$(document).ready(function(){
    prolunch.init();
});