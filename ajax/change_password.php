<?php
// header('Content-Type: application/json');
	
	require_once('../config/function_sql.php');
	
	$connect = connectToDatabase();

	if(!$connect)
		exit();

	if(!$_GET['uname'] || !$_GET['rkey'] || !$_GET['n_pword'])
		exit();

	// verif_account($_GET['uname'],$connect);
	echo($_GET['uname']);

	$id = $connect->prepare(
		"SELECT mail_check FROM `cam_users` WHERE login = :username OR mail = :username"
	);

	$id->execute(array(
			'username' => $_GET['uname']
		));

	$result_id = $id->fetch(PDO::FETCH_ASSOC);

	// print_r($result_id);

	function password_change($username,$bdd,$new_password)
	{

		$validate = $bdd->prepare(
		"UPDATE `cam_users` SET `password` = :password WHERE login = :username OR mail = :username");

		$validate->execute(array(
			'username' => $username,
			'password' => $new_password
		));

		if($validate)
 			echo ("false"); //Voir avec l'ajaxification
	 	else
 			echo ("true");
	}

	if ($result_id['mail_check'] === $_GET['rkey'])
		password_change($_GET['uname'],$connect,hash("whirlpool", $_GET['n_pword']));
	else
		echo("false");
?>