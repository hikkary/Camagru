<?php
header('Content-Type: application/json');
require_once('../config/function_sql.php');

$connect = connectToDatabase();

if(!$connect)
  exit();


//
// function first_comment($connect,$comment,$new_comment)
// {
//     $new_tab[] = $new_comment ;
//     $new_tab = json_encode($new_tab);
//
//     $first_comment = $connect->prepare(
//     "UPDATE `photo` SET comment = :tableau WHERE id_photo = :photo_id "
//     );
//
//     $first_comment->execute(array(
//       'photo_id' => $comment['id_photo'],
//       'tableau' => $new_tab
//     ));
//
//     echo(json_encode("true"));
//     return;
// }

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

// function delete_likes($connect, $comment, $result)
// {
//     $result = json_encode($result);
//
//     $other_like = $connect->prepare(
//     "UPDATE `photo` SET liked = :tableau WHERE id_photo = :photo_id "
//     );
//
//     $other_like->execute(array(
//       'photo_id' => $comment['id_photo'],
//       'tableau' => $result
//     ));
//
//     echo(json_encode("true"));
//     return;
// }
//

//
// function check_if_user_liked($result,$likes)
// {
//   $result = json_decode($result['liked'],true);
//
//   foreach ($result as $key => $value) {
//         if($value['id_user'] === $likes['id_user'])
//           {
//               unset($result[$key]);
//               return($result);
//           }
//   }
//   return(FALSE);
// }


	 $comment = ((array)json_decode(file_get_contents('php://input')));
   $new_comment = array('id_user' => $comment['id_user'], 'comment' => $comment['comment']);
   $result = get_comment($connect ,$comment);

   other_comment($connect, $comment, $result, $new_comment);


?>
