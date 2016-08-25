<?php
	ini_set('display_errors','on');
	error_reporting(E_ALL);

	header('Content-Type: application/json');
	
	require_once('../config/function_sql.php');
	
	$connect = connectToDatabase();

	if(!$connect)
		exit();

	$data = ((array)json_decode(file_get_contents('php://input')));

	// echo (json_encode($data));

	$adduser = $connect->prepare( 
		"INSERT INTO `cam_users` (`id_users`, `first_name`, `last_name`, `login`, `password`, `mail`, `mail_check`) VALUES ( NULL, "
		.":first_name"
		.","
		.":last_name"
		.","
		.":username"
		.","
		.":password"
		."," 
		.":email"
		.","
		." '0')"
		);

	$adduser->execute(array(
			'first_name' => $data['t_first_name'],
			'last_name' => $data['t_last_name'],
			'username' => $data['t_username'],
			'password' => $data['t_password'],
			'email' => $data['t_email']
		));

 	echo (json_encode("false"));

	
?>
