<?php
	// header('Content-Type: application/json');
	
	require_once('../config/function_sql.php');
	
	$connect = connectToDatabase();

	if(!$connect)
		exit();

	// if(!$_GET['uname'] || !$_GET['pword'])
	// 	exit();

	 $users = ((array)json_decode(file_get_contents('php://input')));

	$username = $users['t_username'];
	$password = hash("whirlpool", $users['t_password']);

	$user = $connect->prepare( 
		"SELECT login,password FROM `cam_users` WHERE login = :pseudo"
		);

	$user->execute(array(
			'pseudo' => $username
		));

	$result = $user->fetch(PDO::FETCH_ASSOC);

	if(!$result)
	{
		echo (json_encode("true"));
		// faire redirection page d'erreur
	}

	if($password === $result['password'])
		echo (json_encode("false")); // foutre le login dans la variable session
	
?>