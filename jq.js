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
                            withCredentials : true
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
                    var res = "<div class=\"col-sm-6 col-md-4 col-lg-4\" id=\"" + id + "\"'> <div class=\"thumbnail\"> <img class=\"img-rounded img-responsive\" src=\"" + prolunch.link + link_pic + "\" alt=\"...\"> <div class=\"caption text-center\"> <h3>" + nom + "</h3>" + /* <p>"+description+"</p>*/"<p><a href=\"#\" class=\"btn btn-primary\" role=\"button\" id='b"+id+"'>Détails</a></p><p><a href=\"#\" class=\"btn btn-primary\" role=\"button\" id='add"+id+"'>Ajouter au panier <span class=\"badge\">" + prix + "€</span></a></p></div> </div> </div>";
                    $("#list").append(res);
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
                    $("#add"+id).click(function(e){
                        e.preventDefault();
                        prolunch.modules.itemManager.service.getResource(prolunch.link+'plats/'+id,prolunch.modules.panier.manager.addItem);
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


prolunch.modules.panier= (function(){
    var panier = [];
    var total =0;
    return{
        manager : (function(){
            return {
                addItem : function(data){
                    var id = data.plat.id;
                    var name = data.plat.nom;
                    var nb = 1;
                    var prix = data.plat.prix;
                    var present = false;
                    panier.forEach(function(val,i,tab){
                        if(val.id == id){
                            present = true;
                            val.qte++;
                            total += parseFloat(val.prix);
                            prolunch.modules.panier.view.majQte(val);
                        }
                    });
                    if(!present){
                        panier.push({'id': id, 'name': name, 'qte': nb, 'prix': prix});
                        total += nb * prix;
                        prolunch.modules.panier.view.displayLine({'id':id,'name':name,'qte':nb,'prix':prix});
                    }

                    prolunch.modules.panier.view.majTotal();
                },
                addOneItem : function(id){
                    panier.forEach(function(val,i,tab){
                        if(val.id == id){
                            val.qte++;
                            total += parseFloat(val.prix);
                            prolunch.modules.panier.view.majQte(val);
                        }
                    });
                    prolunch.modules.panier.view.majTotal();
                },
                delOneItem : function(id){
                    var supr = -1;
                    panier.forEach(function(val,i,tab){
                        if(val.id == id){
                            val.qte--;
                            if(val.qte<=0)supr = i;
                            total -= parseFloat(val.prix);
                            prolunch.modules.panier.view.majQte(val);
                        }
                    });
                    if(supr>=0)panier.splice(supr,1);
                    prolunch.modules.panier.view.majTotal();

                },
                delItem : function(id){
                    var supr = -1;
                    panier.forEach(function(val,i,tab){
                        if(val.id == id){
                            supr = i;
                            total -= val.qte*val.prix;
                        }
                        if(supr>=0)panier.splice(supr,1);
                        prolunch.modules.panier.view.majTotal();
                    });
                    $('#panier'+id).remove();
                }
            }
        })(),
        view : (function(){
            return {
                displayLine : function(line){
                    //line = {'id':id,'name':name,'qte':nb,'prix':prix}
                    var res = "<div class='col-md-12 col-lg-12 col-sm-12 thumbnail' id='panier"+line.id+"'><div class='col-md-4 col-lg-4 col-sm-6'>"+line.name+"</div><div class='col-md-4 col-lg-4 col-sm-6'><a href=\"#\" class=\"btn btn-primary btn-xs\" role=\"button\" id='delone"+line.id+"'>-</a><span id='qte"+line.id+"'> "+line.qte+" </span><a href=\"#\" class=\"btn btn-primary btn-xs\" role=\"button\" id='addone"+line.id+"'>+</a></div><div class='col-md-4 col-lg-4 col-sm-12'><span>Prix unitaire : <b id='prix"+line.id+"'> "+line.prix*line.qte+" </b> € </span><a href=\"#\" class=\"btn btn-danger btn-xs\" role=\"button\" id='del"+line.id+"'>X</a></div></div>";
                    $('#contentPanier').append(res);
                    //ajouter handler aux boutons. (màj infos + lignes): addone+id delone+id del+id
                    $('#del'+line.id).click(function(e){
                        e.preventDefault();
                        prolunch.modules.panier.manager.delItem(line.id);
                    });
                    $('#addone'+line.id).click(function(e){
                        e.preventDefault();
                        prolunch.modules.panier.manager.addOneItem(line.id);
                    });
                    $('#delone'+line.id).click(function(e){
                        e.preventDefault();
                        prolunch.modules.panier.manager.delOneItem(line.id);
                    });
                },
                displayPanier : function(){
                    //hide list
                    $('#list').fadeToggle();

                    //show panier
                    $('#panier').fadeToggle();
                },
                majTotal : function() {
                    $('#totalPanier').text(total);
                },
                majQte : function(line){
                    $('#qte'+line.id).text(" "+line.qte+" ");
                }
            }
        })(),
        panierTotal : function(){
            return {"panier":panier,"prix":total};
        }
    }
})();

prolunch.modules.commandes = (function(){
    //private
    var userName,pwd,dateCreate,commandeId;
    //public
    return{
        commandeManager : (function(){
            return {
                verifyUserName: function () {
                    if($('#userName').val().length<4) {
                        $('#formUserName').removeClass('has-success');
                        $('#formUserName').addClass('has-error');
                        $('#helpUserName').text('Le nom d\'utilisateur doit faire au minimum 4 caractères !');
                    }else{
                        $('#formUserName').removeClass('has-error');
                        $('#formUserName').addClass('has-success');
                        $('#helpUserName').text("");
                        userName = $('#userName').val;
                    }
                },
                verifyPwd: function () {
                    if($('#pwd').val().length<4) {
                        $('#formPwd').removeClass('has-success');
                        $('#formPwd').addClass('has-error');
                        $('#helpPwd').text('Le mot de passe doit faire au minimum 4 caractères !');
                    }else{
                        $('#formPwd').removeClass('has-error');
                        $('#formPwd').addClass('has-success');
                        $('#helpPwd').text("");
                        pwd = $('#pwd').val;
                    }
                },
                sendCommande : function(){
                    var commande = {'client':userName,'passwd':pwd};
                    var callback = function(data){
                        commandeId = data.commande.id;
                        dateCreate = data.commande.created_at;
                        uri = prolunch.link + data._links.plats+"?pass="+pwd;
                        var panier = prolunch.modules.panier.panierTotal().panier;
                        var nbRestant = panier.length;
                        var fin = function(data){
                            alert("L'envoie de votre commande a été pris en compte.");
                            prolunch.modules.commandes.view.displayFinal(commandeId);
                        };
                        callback2 = function(data){
                            if(nbRestant>0) {
                                var idp = panier[panier.length - nbRestant].id;
                                var q = panier[panier.length - nbRestant].qte;
                                var plat = {'idp': idp, 'q': q};
                                nbRestant--;
                                if (nbRestant >= 0) {
                                    $.ajax({
                                        url: uri,
                                        type: 'POST',
                                        dataType: 'json',
                                        data: plat,
                                        success: callback2,
                                        xhrFields: {
                                            withCredentials: true
                                        },
                                        crossDomain: true
                                    });
                                } else {
                                    fin(data);
                                }
                            }else fin(data);
                        };
                        if(panier.length>0) {
                            callback2();
                        }else{alert('Votre commande est vide !');}
                    };
                    var uri = prolunch.link + "commandes/";
                    $.ajax({
                        url : uri,
                        type : 'POST',
                        dataType : 'json',
                        data : commande,
                        success : callback,
                        xhrFields : {
                            withCredentials : true
                        },
                        crossDomain : true
                    });

                },
                getCommande : function(id,callback){
                    var uri = prolunch.link + "commandes/"+id+"?pass=undefined";/* undefined fonctionne, alors que pwd (le mot de passe) ne fonctionne pas */
                    $.ajax({
                        url : uri,
                        type : 'GET',
                        dataType : 'JSON',
                        success : callback,
                        xhrFields : {
                            withCredentials : true
                        },
                        crossDomain : true
                    });
                },
                getPlats : function(id,callback){
                    var uri = prolunch.link + "commandes/"+id+"/plats?pass=undefined";
                    $.ajax({
                        url : uri,
                        type : 'GET',
                        dataType : 'JSON',
                        success : callback,
                        xhrFields : {
                            withCredentials : true
                        },
                        crossDomain : true
                    });
                }
            }
        })(),
        view : (function(){
            return {
                displayLine : function(line){
                    //line = {'id':id,'name':name,'qte':nb,'prix':prix}
                    var res = "<div class='col-md-12 col-lg-12 col-sm-12 thumbnail'><div class='col-md-4 col-lg-4 col-sm-6'>"+line.name+"</div><div class='col-md-4 col-lg-4 col-sm-6'><span id='qte"+line.id+"'> Quantité : "+line.qte+" </span></div><div class='col-md-4 col-lg-4 col-sm-12'><span>Prix total : <b> "+line.prix*line.qte+" </b> € </span></div></div>";
                    $('#contentCommande').append(res);
                },
                displayCommande : function(){
                    //charger le panier
                    var dataPanier = prolunch.modules.panier.panierTotal();
                    //remplir les lignes de la commande
                    dataPanier.panier.forEach(function(val,i,tab){
                        prolunch.modules.commandes.view.displayLine(val);
                    });
                    var totalPanier = dataPanier.prix;
                    $('#contentCommande').append("<h2>Prix total : <small>"+totalPanier+" €</small></h2>");
                    $("#send").click(function(e){
                        prolunch.modules.commandes.commandeManager.verifyUserName();
                        prolunch.modules.commandes.commandeManager.verifyPwd();
                        prolunch.modules.commandes.commandeManager.sendCommande();
                    });
                    $('#panier').fadeToggle();
                    $('#commande').fadeToggle();
                },
                displayFinal : function(id){
                    $('#commande').fadeToggle();
                    $('#finalCommande').fadeToggle();
                    console.log(prolunch.modules.commandes.commandeManager.getCommande(id,prolunch.modules.commandes.view.displayFinalCommande));
                    console.log(prolunch.modules.commandes.commandeManager.getPlats(id,prolunch.modules.commandes.view.displayFinalLine));
                },
                displayFinalLine : function(data){
                    //JSON data : [{_links:{self:{href:"/plats/id"}},description:"blabla",id:1,id_resto:1,nom:"nom",photo:{href:"/images/small/nom.jpg"},pivot:{commande_id:417,plats_id:1,quantite:1},prix:"8.00",type:"plat"},{...},...]
                    data.forEach(function(val,i,tab){
                        var line = {'name':val.nom,'qte':val.pivot.quantite,'prix':val.prix};
                        var res = "<div class='col-md-12 col-lg-12 col-sm-12 thumbnail'><div class='col-md-4 col-lg-4 col-sm-6'>"+line.name+"</div><div class='col-md-4 col-lg-4 col-sm-6'><span> Quantité : "+line.qte+" </span></div><div class='col-md-4 col-lg-4 col-sm-12'><span>Prix total : <b> "+line.prix*line.qte+" </b> € </span></div></div>";
                        $('#contentFinalCommande').append(res);
                    });
                },
                displayFinalCommande : function(data){
                //JSON data : {_link:{plats:"/commandes/417/plats"},commande:{client:"undefined",created_at:"date",etat:0,id:417,montant:"18.00",passwd:null,type:"commande",updated_at:"date"}}
                    var date = data.commande.created_at;
                    var montant = data.commande.montant;
                    $('#date').text(date);
                    $('#contentFinalCommande').append("<h2><small>Montant de la commande : </small><b>"+montant+" €</b></h2>");
                }
            }
        })()
    }
})();

prolunch.init = function () {
    prolunch.modules.itemManager.service.getResource(prolunch.link+'plats/',prolunch.modules.itemManager.view.displayListe);
    $('#panier').fadeToggle();
    $('#commande').fadeToggle();
    $('#finalCommande').fadeToggle();
    $('#showPanier').click(function(e){
        e.preventDefault();
        prolunch.modules.panier.view.displayPanier();
    });
    $('#showList').click(function(e){
        e.preventDefault();
        $('#panier').fadeToggle();
        $('#list').fadeToggle();
    });
    $('#showCommande').click(function(e){
        e.preventDefault();
        prolunch.modules.commandes.view.displayCommande();
    });
    $('#again').click(function(){
       document.location.reload();
    });
};

$(document).ready(function(){
    prolunch.init();
});