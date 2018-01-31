<?php

  function repertoire($dir) {
    $current = shell_exec("cd $dir; pwd"); // récupère le répertoire courant
    return rtrim($current); // renvoie le répertoire courant
  }

  function dossiers($dir) {
      $files = shell_exec("cd $dir; ls -m"); // liste les fichiers et dossiers du répertoire courant dans une chaine de caractères
      $file = explode(", ", rtrim($files)); // on transforme la chaîne de caractères en tableau
      return $file; // renvoie la liste au format json
    //}
  }

  function retour($dir) {
    $result = shell_exec("cd $dir; cd ..; pwd"); // retourne au répertoire précédent depuis celui passé en argument
    echo rtrim($result); // affiche le nouveau répertoire
  }

  if (isset($_POST['repertoire'])) { // On teste si un post de 'repertoire' est envoyé
    $res[0] = repertoire($_POST['repertoire']); // on la passe en argument de la fonction répertoire et on met cette valeur dans une variable qui sera la première ligne du tableau de résultat
    $res[1] = dossiers($_POST['repertoire']); // on la passe en argument de la fonction dossiers et on met le tableau renvoyé dans une variable qui sera la seconde ligne du tableau de résultat
    echo json_encode($res); // on envoie le tableau au format json
  }

  if ($_POST['action'] == "retour") { // On test si la valeur du post 'action' est bien égale à retour
    retour($_POST['current']); // Dans ce cas, on lance la fonction retour avec le répertoire transmis comme argument
  }

?>
