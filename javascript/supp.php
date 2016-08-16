<?php

header('Content-Type: application/json'); // necessaire lors de l'envoi de JSON
$data = ((array)json_decode(file_get_contents('php://input')));// je decode le json envoyé 
echo(json_encode($data)); // me permet d'afficher les donnee envoyer via le js, en format json
?>
