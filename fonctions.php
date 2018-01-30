<?php

  function repertoire($dir) {
    $current = shell_exec("cd $dir; pwd"); // récupère le répertoire courant
    //$current = json_encode($current);
    return $current; // affiche le répertoire courant
  }

  function dossiers($dir) {
    //if (isset($dir)) {
      $files = shell_exec("cd $dir; ls -m"); // liste les fichiers et dossiers du répertoire courant dans une chaine de caractères
      $file = explode(",", $files); // on transforme la chaîne de caractères en tableau
      //$result = json_encode($file);
      return $file; // affiche la liste au format json
    //}
  }

  function retour() {
    $back = shell_exec("cd ../"); // retourne au répertoire précédent
  }

  if (isset($_POST['repertoire'])) {
    $res[0] = repertoire($_POST['repertoire']);
    $res[1] = dossiers($_POST['repertoire']); //j'exécute la fonction dossiers
    echo json_encode($res);
  }

?>
