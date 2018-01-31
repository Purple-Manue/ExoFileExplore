<?php

  function repertoire($dir) {
    $current = shell_exec("cd $dir; pwd"); // récupère le répertoire courant
    //$current = json_encode($current);
    return rtrim($current); // affiche le répertoire courant
  }

  function dossiers($dir) {
    //if (isset($dir)) {
      /*if (strpos($dir, '.') !== false) {
        $files = shell_exec("cd . ;ls -m");
        $files = explode(", ", rtrim($files));
        return $dir;
      }*/
      $files = shell_exec("cd $dir; ls -m"); // liste les fichiers et dossiers du répertoire courant dans une chaine de caractères
      $file = explode(", ", rtrim($files)); // on transforme la chaîne de caractères en tableau
      //$result = json_encode($file);
      return $file; // affiche la liste au format json
    //}
  }

  function retour($dir) {
    $result = shell_exec("cd $dir; cd .. ;pwd"); // retourne au répertoire précédent
    return rtrim($result);
  }

  if (isset($_POST['repertoire'])) {
    $res[0] = repertoire($_POST['repertoire']);
    $res[1] = dossiers($_POST['repertoire']);
    echo json_encode($res);
  }

  if ($_POST['action'] == "retour") {
    retour();
  }

?>
