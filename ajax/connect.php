<?php
	// header('Content-Type: application/json');
	
	require_once('../config/function_sql.php');
	
	$connect = connectToDatabase();

	if(!$connect)
		exit();

	if(!$_GET['uname'] || !$_GET['pword'])
		exit();

	// $users = ((array)json_decode(file_get_contents('php://input')));

	$username = $_GET['uname'];
	$password = hash("whirlpool", $_GET['pword']);

	$user = $connect->prepare( 
		"SELECT login,password FROM `cam_users` WHERE login = :pseudo"
		);

	$user->execute(array(
			'pseudo' => $username
		));

	$result = $user->fetch(PDO::FETCH_ASSOC);

	if(!$result)
	{
		echo "dendi";
		// faire redirection page d'erreur
	}

	if($password === $result['password'])
		echo "ok"; // foutre le login dans la variable session
	
?>