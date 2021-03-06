<?php

header('Content-Type: application/json'); // necessaire lors de l'envoi de JSON
$data = ((array)json_decode(file_get_contents('php://input')));// je decode le json envoyé


function imagefromb64($image_data){
$random_path1 = rand(0,10000);
$random_key = rand(0,9);
$random_path2 = rand(0,10000);
$path = "../pictures/".$random_path1.$random_key.$random_path2.".png";
$tableau = explode(',', $image_data);
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


imagecopy($image_destination, $image_source, 0, 0, 0, 0, $largeur_source, $hauteur_source);

imagepng($image_destination, $picture);

$image_finale = file_get_contents($picture);

$image_finale = base64_encode($image_finale);

unlink($canvas);

$image_finale = addimagemetadatatobase64($image_finale);

$tableau = array("picture" => $image_finale, "url" => $picture);

echo (json_encode($tableau));
?>
