$(document).ready(function() { //dès que le DOM est chargé

  var dir = 'current'; // j'initialise une variable dir
  $.post('fonctions.php', {dir}, function(data, status) { //j'envoie la variable dir à fonctions.php
    $('#chemin').html(data); //Affiche moi dans la span avec id="chemin" le retour de fonctions.php
  });

  var liste = 'current'; // j'initialise une variable liste
  $.post('fonctions.php', {liste}, function(data, status) { //j'envoie la variable liste à fonctions.php
    $('#dossiers').html(data);//Affiche moi dans la div avec id="dossiers" le retour de fonctions.php
    console.log(data);
  });

});
