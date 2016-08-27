<?php
	header('Content-Type: application/json');
	
	require_once('../config/function_sql.php');
	
	$connect = connectToDatabase();

	if(!$connect)
		exit();


	$data = ((array)json_decode(file_get_contents('php://input')));

	$adduser = $connect->prepare( 
		"INSERT INTO `cam_users` (`id_users`, `first_name`, `last_name`, `login`, `password`, `mail`, `mail_check`, `mail_key`) VALUES ( NULL, "
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
		.":email_key"
		.","
		." '0')"
		);

	$adduser->execute(array(
			'first_name' => $data['t_first_name'],
			'last_name' => $data['t_last_name'],
			'username' => $data['t_username'],
			'password' => $data['t_password'],
			'email' => $data['t_email'],
			'email_key' => $data['t_random']
		));

	if($adduser)
 		echo (json_encode("false"));
 	else
 		echo (json_encode("true"));
	
?>
