<?php
header('Content-Type: application/json');
require_once('../config/function_sql.php');

$connect = connectToDatabase();

if(!$connect)
  exit();



function get_comment($connect, $comment)
{
  $like = $connect->prepare(
  "SELECT `comments` FROM `photo` WHERE id_photo = :photo_id "
  );

  $like->execute(array(
     'photo_id' => $comment['id_photo']
  ));

  $result = $like->fetch(PDO::FETCH_ASSOC);

  return ($result);
}


function other_comment($connect, $comment, $result, $new_comment)
{
    $result = json_decode($result['comments'],true);
    $result[] = $new_comment;
    $result = json_encode($result);
    $other_comment = $connect->prepare(

    "UPDATE `photo` SET comments = :tableau WHERE id_photo = :photo_id "
    );

    $other_comment->execute(array(
      'photo_id' => $comment['id_photo'],
      'tableau' => $result
    ));

    echo($result);
    return;
}

   $comment = ((array)json_decode(file_get_contents('php://input')));
   $new_comment = array('id_user' => $comment['id_user'], 'comment' => $comment['comment']);
   if(ctype_alnum($comment['comment']) === FALSE){
		echo(json_encode("false"));
		return;
	}

   $result = get_comment($connect ,$comment);

   other_comment($connect, $comment, $result, $new_comment);


?>
