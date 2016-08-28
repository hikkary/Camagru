<?php
	function verif_account($username,$bdd)
	{
		$verif = $bdd->prepare(
		"SELECT mail_key FROM `cam_users` WHERE login = :username ");

		$verif->execute(array(
			'username' => $username
		));

		$result_verif = $verif->fetch(PDO::FETCH_ASSOC);

		// echo($result_verif['mail_key'])."\n";
		if($result_verif['mail_key'] === "1")
		{
 			echo ("Account already verified");
 			exit();
		}
	 	else
 			echo ("true");
	}
// header('Content-Type: application/json');
	
	require_once('../config/function_sql.php');
	
	$connect = connectToDatabase();

	if(!$connect)
		exit();

	if(!$_GET['uname'] || !$_GET['rkey'])
		exit();

	// echo($_GET['uname']);

	verif_account($_GET['uname'],$connect);

	$id = $connect->prepare(
		"SELECT mail_check FROM `cam_users` WHERE login = :username"
	);

	// $id->execute();
	
	$id->execute(array(
			'username' => $_GET['uname']
		));

	$result_id = $id->fetch(PDO::FETCH_ASSOC);

	// var_dump($result_id);
	// echo $result_id['mail_check'];


	function validate_account($username,$bdd)
	{

		$validate = $bdd->prepare(
		"UPDATE `cam_users` SET `mail_key` = '1' WHERE login = :username ");

		$validate->execute(array(
			'username' => $username
		));

		if($validate)
 			echo ("false");
	 	else
 			echo ("true");
	}

	if ($result_id['mail_check'] === $_GET['rkey'])
		validate_account($_GET['uname'],$connect);
	else
		echo("false");
?>