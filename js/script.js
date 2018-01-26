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
         $('#dossiers').append('<span class="file">' + json[key] + '<br />' + '</span>');
       } // pour chaque élément dans le tableau, on créée un span contenant la classe file avec le contenu
         $('.file').click(function(){
           var rep = $(this).text(); // on récupère le contenu du span
           console.log(rep);
           //explore();
         });
      }
    });
  }

  explore();
  //alert("coucou");


});
