<?php
// on peux optimiser via delete_picture
// voir si j'ajoute verification de session

function delete_picture_from_database($id_user, $id_photo, $bdd)
{
  $delete = $bdd->prepare(
  "DELETE FROM `photo` WHERE id_photo = :photo_id"
  );
  $delete->execute(array(
    'photo_id' => $id_photo
  )
);

  if($delete){
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

// str_replace("..","",$id['t_url']);

if($id['t_url'])
{
  if(file_exists($id['t_url']) !== FALSE)
  {
	unlink($id['t_url']);
    delete_picture_from_database($id['user_id'], $id['photo_id'], $connect );
  }
  else {
    delete_picture_from_database($id['user_id'], $id['photo_id'], $connect );
  }
  return;
}
else{
    echo(json_encode('false'));
    return;
}
?>
