<?php

  function repertoire() {
    $dir = shell_exec("pwd"); // récupère le répertoire courant
    echo $dir; // affiche le répertoire courant
  }

  function dossiers() {
    $files = shell_exec("ls -m"); // liste les fichiers et dossiers du répertoire courant dans une chaine de caractères
    $file = explode(",", $files); // on transforme la chaîne de caractères en tableau
    $result = json_encode($file);
    print_r($result); // affiche la liste au format json
  }

  function retour() {
    $back = shell_exec("cd ../"); // retourne au répertoire précédent
  }

  if ($_POST['dir'] == "current") { // si je reçois la valeur "current" de la variable dir
    repertoire(); //j'exécute la fonction repertoire
  }

  if (isset($_POST)) { // si je reçois la valeur "current" de la variable liste
    dossiers(); //j'exécute la fonction dossiers
  }

?>
