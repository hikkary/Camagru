<?php
// on peux optimiser via delete_picture

function delete_picture_from_database($id_user, $id_photo, $bdd)
{
  $bdd->prepare(
  "DELETE FROM `photo` WHERE id_photo = :photo_id"
  );
  $bdd->execute();

  if($bdd){
    echo(json_encode('true'));
    return;
  }
  else {
    echo(json_encode('false'));
    return;
  }

}

header('Content-Type: application/json');
session_start();
require_once('../config/function_sql.php');

$connect = connectToDatabase();

if(!$connect)
  exit();

$id = ((array)json_decode(file_get_contents('php://input')));

str_replace("..","",$path['t_url']);

if((unlink($path['t_url']) === TRUE))
{
  delete_picture_from_database($id['user_id'], $id['photo_id'], $connect );
  return;
}
else{
    echo(json_encode('false'));
    return;
}
?>
