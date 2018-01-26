<?php

  function repertoire() {
    $dir = shell_exec("pwd"); // récupère le répertoire courant
    echo $dir; // affiche le répertoire courant
  }

  function dossiers() {
    $files = (shell_exec("ls")); // liste les fichiers et dossiers du répertoire courant
    echo $files; // affiche la liste
  }

  function retour() {
    $back = shell_exec("cd ../"); // retourne au répertoire précédent
  }

  if ($_POST['dir'] == "current") { // si je reçois la valeur "current" de la variable dir
    repertoire(); //j'exécute la fonction repertoire
  }

  if ($_POST['liste'] == "current") { // si je reçois la valeur "current" de la variable liste
    dossiers(); //j'exécute la fonction dossiers
  }


?>
