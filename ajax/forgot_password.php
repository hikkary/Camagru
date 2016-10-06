<?php
	header('Content-Type: application/json');
	session_start();
	require_once('../config/function_sql.php');

	$connect = connectToDatabase();

	if(!$connect)
		exit();

	 $users = ((array)json_decode(file_get_contents('php://input')));

	$username = $users['t_username'];

	$user = $connect->prepare(
		"SELECT login,mail,mail_check FROM `cam_users` WHERE login = :pseudo OR mail = :pseudo"
		);

	$user->execute(array(
			'pseudo' => $username
		));

	$result = $user->fetch(PDO::FETCH_ASSOC);

	if(!$result)
	{
		echo (json_encode("true"));
	}

	if($username === $result['login'] || $username === $result['mail'])
	{
		$result['check'] = "false";
		echo (json_encode($result)); // foutre le login dans la variable session
	}
?>
