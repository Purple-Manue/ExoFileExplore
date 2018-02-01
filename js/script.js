function explore(repertoire) { // on déclare une fonction explore qui prendra pour argument un répertoire
  var dir = repertoire; // j'initialise une variable dir
  $.post('fonctions.php', {repertoire: dir}, function(data, status) { //j'envoie la variable dir à fonctions.php
    $('#chemin').html(dir); //Affiche moi dans la span avec id="chemin" le retour de fonctions.php
  });

  $.ajax({
    type:"POST", // on déclare un type post pour la requête
    url: 'fonctions.php', // on cible le fichier qui contient les données
    data: "repertoire="+dir, // on lui envoie la valeur de dir en tant que variable 'repertoire'
    success: function(json) { // en cas de succès de la requête, on lance un fonction qui récupère le tableau json envoyé par php

    var lst = JSON.parse(json); // on parse le tableau json
     for (var i=0; i<lst[1].length; i++) { // on lance une boucle dans le tableau en seconde ligne du tableau json envoyé par php
       var name = lst[1][i].indexOf("."); // on initialise la variable name dans laquelle on regarde pour chaque clé si elle contient un point
        if (name != "-1") { // si il y a un point dans le nom, on considère qu'il s'agit d'un fichier
          $('#dossiers').append('<span class="fichier file col-6 col-md-3">' + '<i class="fas fa-file fa-4x">' + '</i>' + '<br />' + lst[1][i] + '</span>');
        } else { // sinon, on considère que c'est un dossier et on affiche une icone en conséquence
          $('#dossiers').append('<span class="dossier file col-6 col-md-3">' + '<i class="fas fa-folder-open fa-4x">' + '</i>' + '<br />' + lst[1][i] + '</span>');
        }
     }

     $('.file').click(function(){
       var name = $(this).text(); // on récupère le contenu du span
       var test = name.indexOf("."); // on check si ce nom contient un .
       var rep; // on initialise une variable rep
       var chemin = $('#chemin').html();
       if (test == "-1") { // si il n'y a pas de "."
          if (chemin != "/") { // si le chemin est différent de "/"
            rep = dir+"/"+name; // on envoie la valeur dans la variable rep en ajoutant un "/"
          } else { // sinon
            rep = dir+name; // on envoie la valeur dans la variable rep sans "/"
          }
          $.post ('fonctions.php', {repertoire: rep}, function(data, status) { // on envoie à php une requete post mentionnant 'repertoire'
          $('#dossiers').html(""); // on vide la div "dossiers"
          explore(rep); // on lance la fonction explore avec le contenu de la variable rep en argument
          })
       }
     });
   }

  });

}
$('#retour').click(function() { // au clic sur le span dont l'id est "retour"
  var rep = $('#chemin').html(); // on récupère le contenu du span dont l'id est "chemin" dans une variable
  if (rep != "/"){
    $.post ('fonctions.php', {action: "retour", current: rep}, function(data, status) { // on post la chaine "retour" et une valeur 'current'
    $('#chemin').html(data); // on modifie le contenu du span chemin avec la data renvoyé par la fonction php
    var current = $('#chemin').html(); // on récupère cette nouvelle valeur dans une variable 'current'
    $('#dossiers').html(""); // on vide la div "dossiers"
     explore(current); // on lance la fonction explore avec le contenu de la variable current en argument
   });
  } 
});


$(document).ready(function() { //dès que le DOM est chargé
  explore("/"); // on lance la fonction explore avec le repertoire racine en argument
});
