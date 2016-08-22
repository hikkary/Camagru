<?php

header('Content-Type: application/json'); // necessaire lors de l'envoi de JSON
$data = ((array)json_decode(file_get_contents('php://input')));// je decode le json envoyé 
 // echo(json_encode($data['picture']))."  "; // me permet d'afficher les donnee envoyer via le js, en format json
// echo($data["canvas"]);
 // $picture = $data["picture"];
// $canvas = $data["canvas"];


function imagefromb64($image_data){
$random_path1 = rand(0,10000);
$random_path2 = rand(0,10000);
$path = "../tmp/".$random_path1.$random_path2.".png";
$tableau = explode(',', $image_data);
// echo $path."\n";
// echo $tableau[1]."\n";
$data = base64_decode($tableau[1]);
file_put_contents($path, $data);
return($path);
}

function addimagemetadatatobase64($base64){
    $image64 = "data:image/png;base64,".$base64;
    return($image64);
}

$picture = imagefromb64($data['picture']);
$canvas = imagefromb64($data['canvas']);

$image_destination = imagecreatefrompng($picture);
$image_source = imagecreatefrompng($canvas);

$largeur_destination = imagesx($image_destination);
$hauteur_destination = imagesy($image_destination);
$largeur_source = imagesx($image_source);
$hauteur_source = imagesy($image_source);

// echo ($largeur_destination)."\n";

// echo $picture."\n";

imagecopy($image_destination, $image_source, 0, 0, 0, 0, $largeur_source, $hauteur_source);

imagepng($image_destination, $picture);

$image_finale = file_get_contents($picture);

$image_finale = base64_encode($image_finale);

unlink($canvas);

$image_finale = addimagemetadatatobase64($image_finale); 

unlink($picture);

echo (json_encode($image_finale));
// echo(json_encode($picture));
?>
