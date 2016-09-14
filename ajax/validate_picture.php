<?php
	header('Content-Type: application/json');
	session_start();
	require_once('../config/function_sql.php');

	$connect = connectToDatabase();

	if(!$connect)
		exit();

	if(!$_SESSION || !$_SESSION['username'])
		{
			echo(json_encode("true"));
		}

	 $path = ((array)json_decode(file_get_contents('php://input')));

	 $path['t_url'] = str_replace("..","",$path['t_url']);

	$user = $connect->prepare(
		"SELECT id_users FROM `cam_users` WHERE login = :pseudo"
		);

	$user->execute(array(
			'pseudo' => $_SESSION['username']
		));

	$result = $user->fetch(PDO::FETCH_ASSOC);

	if(!$result)
	{
		echo (json_encode("true"));
		// faire redirection page d'erreur
	}
	else {
		$photo = $connect->prepare(
		"INSERT INTO `photo` (`id_photo`, `id_user`, `photo_url`, `comments`, `liked`)
		 VALUES (NULL, :userid, :photo, NULL, NULL)
		");

		$photo->execute(array(
			'userid' => $result['id_users'],
			'photo' => $path['t_url']
		));

		if($photo)
			echo (json_encode("false"));
		else
			echo (json_encode("true"));
	}
?>
