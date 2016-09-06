<?php
 header('Content-Type: application/json');

	function check_change($username,$bdd)
	{
		 $random = rand(100000,999999);
		 // $random = 0;

		$key_change = $bdd->prepare(
		"UPDATE `cam_users` SET `mail_check` = :random WHERE login = :username OR mail = :username");

		$key_change->execute(array(
			'random' => $random,
			'username' => $username
		));

		if($key_change)
 			return true; //Voir avec l'ajaxification
	 	else
 			return false;
	}

	function password_change($username,$bdd,$new_password)
	{

		$validate = $bdd->prepare(
		"UPDATE `cam_users` SET `password` = :password WHERE login = :username OR mail = :username");

		$validate->execute(array(
			'username' => $username,
			'password' => $new_password
		));

		if($validate){
			if(check_change($username, $bdd) === true)
 				echo(json_encode("false")); //Voir avec l'ajaxification
			else {
					echo(json_encode("true"));
				}
		}
	 	else
 			echo(json_encode("true"));
	}

	require_once('../config/function_sql.php');

	$connect = connectToDatabase();

	if(!$connect)
		exit();

	$password = ((array)json_decode(file_get_contents('php://input')));
	// var_dump($password);
	// return;

	if ($password)
		password_change($password['t_username'],$connect,hash("whirlpool", $password['t_password']));
	else {
			echo(json_encode("true"));
	}
?>
