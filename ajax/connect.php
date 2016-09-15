<?php
	header('Content-Type: application/json');
	session_start();
	require_once('../config/function_sql.php');

	$connect = connectToDatabase();

	if(!$connect)
		exit();

	 $users = ((array)json_decode(file_get_contents('php://input')));

	$username = $users['t_username'];
	$password = hash("whirlpool", $users['t_password']);

	$user = $connect->prepare(
		"SELECT login,password,id_users FROM `cam_users` WHERE login = :pseudo"
		);

	$user->execute(array(
			'pseudo' => $username
		));

	$result = $user->fetch(PDO::FETCH_ASSOC);

	if(!$result)
	{
		// faire redirection page d'erreur
		echo (json_encode("true"));
		return;
	}

	if($password === $result['password'])
	{
		echo (json_encode("false")); // foutre le login dans la variable session
		$_SESSION['username'] = $username;
		$_SESSION['id'] = $result['id_users'];
		return;
	}
	else {
		echo (json_encode("true"));
		return;
	}
?>
