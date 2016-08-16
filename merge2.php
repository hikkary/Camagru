<?php

// header('Content-Type: application/json'); // necessaire lors de l'envoi de JSON
$data = ((array)json_decode(file_get_contents('php://input')));// je decode le json envoyé 
// echo(json_encode($data))."  "; // me permet d'afficher les donnee envoyer via le js, en format json
// echo($data["canvas"]);
// $picture = $data["picture"];
// $canvas = $data["canvas"];

$largeur_picture = imagesx($data["picture"]);
$hauteur_picture = imagesy($data["picture"]);
$largeur_canvas = imagesx($data["canvas"]);
$hauteur_canvas = imagesy($data["canvas"]);

imagecopymerge($data["picture"], $data["canvas"], 0, 0, 0, 0, $largeur_picture, $hauteur_picture, 0);

// echo (json_encode($picture));
echo(json_encode($data));
?>
