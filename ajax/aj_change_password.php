<?php
// header('Content-Type: application/json');
	function username_check($connect,$username)
	{
		$id = $connect->prepare(
			"SELECT mail_check FROM `cam_users` WHERE login = :username OR mail = :username"
		);

		$id->execute(array(
				'username' => $username
			));

		$result_id = $id->fetch(PDO::FETCH_ASSOC);

		return($result_id);
	}

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
 			echo ("cle changer"); //Voir avec l'ajaxification
	 	else
 			echo ("non je n'ai pas changer");
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
			check_change($username, $bdd);
 			echo ("false"); //Voir avec l'ajaxification
		}
	 	else
 			echo ("true");
	}

	require_once('../config/function_sql.php');

	$connect = connectToDatabase();

	if(!$connect)
		exit();

	if(!$_GET || !$_GET['uname'] || !$_GET['rkey'] || !$_GET['n_pword'])
		exit();

	$result_id = username_check($connect,$_GET['uname']);

	if ($result_id['mail_check'] === $_GET['rkey'])
		password_change($_GET['uname'],$connect,hash("whirlpool", $_GET['n_pword']));
	else
		echo("false");
?>
