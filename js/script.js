$(document).ready(function() { //dès que le DOM est chargé
  function explore() {
    var dir = 'current'; // j'initialise une variable dir
    $.post('fonctions.php', {dir}, function(data, status) { //j'envoie la variable dir à fonctions.php
      $('#chemin').html(data); //Affiche moi dans la span avec id="chemin" le retour de fonctions.php
    });

    $.ajax({
      type:"POST", // on déclare un type post pour la requête
      url: 'fonctions.php', // on cible le fichier qui contient les données
      dataType: 'json', // on déclare que les données seront un tableau json
      success: function(json) {
       for(var key in json) { // on lance une boucle dans le tableau
         var name = json[key].indexOf("."); // on initialise la variable name dans laquelle on regarde pour chaque clé si elle contient un point
          if (name != "-1") { // si il y a un point dans le nom, on considère qu'il s'agit d'un fichier
            $('#dossiers').append('<span class="file col-6 col-md-3">' + '<i class="fas fa-file fa-4x">' + '</i>' + '<br />' + json[key] + '</span>');
          } else { // sinon, on considère que c'est un dossier et on affiche une icone en conséquence
            $('#dossiers').append('<span class="file col-6 col-md-3">' + '<i class="fas fa-folder-open fa-4x">' + '</i>' + '<br />' + json[key] + '</span>');
          }
       }

         $('.file').click(function(){
           var rep = $(this).text(); // on récupère le contenu du span
           //console.log(rep);
           //explore();
         });
      }
    });
  }

  explore();
  //alert("coucou");


});
