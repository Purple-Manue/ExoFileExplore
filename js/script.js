$(document).ready(function() { //dès que le DOM est chargé

  function explore(repertoire) {
    var dir = repertoire; // j'initialise une variable dir
    //console.log(repertoire);
    $.post('fonctions.php', {repertoire: dir}, function(data, status) { //j'envoie la variable dir à fonctions.php
      $('#chemin').html(dir); //Affiche moi dans la span avec id="chemin" le retour de fonctions.php
    });
    //console.log(dir);

    $.ajax({
      type:"POST", // on déclare un type post pour la requête
      url: 'fonctions.php', // on cible le fichier qui contient les données
      data: "repertoire="+dir,
      //dataType: 'json', // on déclare que les données seront un tableau json
      success: function(json) {
      console.log(json);

      var lst = JSON.parse(json);
      console.log(lst[1]);
       for (var i=0; i<lst[1].length; i++) { // on lance une boucle dans le tableau
         var name = lst[1][i].indexOf("."); // on initialise la variable name dans laquelle on regarde pour chaque clé si elle contient un point
          if (name != "-1") { // si il y a un point dans le nom, on considère qu'il s'agit d'un fichier
            $('#dossiers').append('<span class="file col-6 col-md-3">' + '<i class="fas fa-file fa-4x">' + '</i>' + '<br />' + lst[1][i] + '</span>');
          } else { // sinon, on considère que c'est un dossier et on affiche une icone en conséquence
            $('#dossiers').append('<span class="file col-6 col-md-3">' + '<i class="fas fa-folder-open fa-4x">' + '</i>' + '<br />' + lst[1][i] + '</span>');
          }
       }

       $('.file').click(function(){
         var name = $(this).text(); // on récupère le contenu du span
         var test = name.indexOf(".");
         var rep;
         if (test == "-1") {
            rep = dir+"/"+name;
            console.log(rep);
            $.post ('fonctions.php', {repertoire: rep}, function(data, status) {
            $('#dossiers').html("");
            explore(rep);
            }) 
         }
         
       });
     }
    });

    $('#retour').click(function() {
      var rep = $('#chemin').html();
      console.log(dir);
      $.post ('fonctions.php', {action: "retour", current: rep}, function(data, status) {
       $('#chemin').html(data);
       var current = $('#chemin').html();
       $('#dossiers').html("");
         explore(current);
         v = $("div.test td").html().replace(/\$\$/g, '$');
     });
      /*$("#dossiers").html("");
      explore(dir);*/
    });

  }
  explore("/home");
});
