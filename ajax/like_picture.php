<?php
header('Content-Type: application/json');
require_once('../config/function_sql.php');

$connect = connectToDatabase();



function first_like($connect,$likes,$new_like)
{
    $new_tab[] = $new_like ;
    $new_tab = json_encode($new_tab);

    $first_like = $connect->prepare(
    "UPDATE `photo` SET liked = :tableau WHERE id_photo = :photo_id "
    );

    $first_like->execute(array(
      'photo_id' => $likes['id_photo'],
      'tableau' => $new_tab
    ));

    echo(json_encode("true"));
    return;
}

function other_likes($connect, $likes, $result, $new_like)
{
    $result = json_decode($result['liked'],true);
    $result[] = $new_like;
    $result = json_encode($result);
    $other_like = $connect->prepare(

    "UPDATE `photo` SET liked = :tableau WHERE id_photo = :photo_id "
    );

    $other_like->execute(array(
      'photo_id' => $likes['id_photo'],
      'tableau' => $result
    ));

    echo(json_encode("true"));
    return;
}

function delete_likes($connect, $likes, $result)
{
    $result = json_encode($result);

    $other_like = $connect->prepare(
    "UPDATE `photo` SET liked = :tableau WHERE id_photo = :photo_id "
    );

    $other_like->execute(array(
      'photo_id' => $likes['id_photo'],
      'tableau' => $result
    ));

    echo(json_encode("true"));
    return;
}



function check_if_user_liked($result,$likes)
{
  $result = json_decode($result['liked'],true);

  foreach ($result as $key => $value) {
        if($value['id_user'] === $likes['id_user'])
          {
              unset($result[$key]);
              return($result);
          }
  }
  return(FALSE);
}

if(!$connect)
  exit();

	 $likes = ((array)json_decode(file_get_contents('php://input')));
   $new_like = array('id_user' => $likes['id_user']);
   $result = get_like($connect ,$likes);

   if($result)
   {
     if($result['liked'] === NULL)
        first_like($connect, $likes, $new_like);
     else
     {
        if(check_if_user_liked($result,$likes) === FALSE)
        {
          other_likes($connect, $likes, $result, $new_like);
        }
        else
        {
          delete_likes($connect, $likes, check_if_user_liked($result,$likes));
          return;
        }
     }

   }
   else {
      echo(json_encode("true"));
      return;
   }
?>
