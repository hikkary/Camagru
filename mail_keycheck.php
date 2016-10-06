<?php
	session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/menu.css">
	<link rel="stylesheet" href="css/mail_keycheck.css">
	<meta name="viewport" content="width=device-width, user-scalable=yes" />
	<link rel="stylesheet" href="fonts/css/font-awesome.min.css">
	<title>Camagru</title>
</head>
<body>
<?php
	$rootname = getcwd();
	require_once($rootname.'/nav/menu.php');
  	menu();
?>

<div id="redirect">
<p> <?php
	require_once('config/function_sql.php');
	require_once('function/redirect.php');

	function verif_account($username,$bdd)
	{
		$verif = $bdd->prepare(
		"SELECT mail_key FROM `cam_users` WHERE login = :username ");

		$verif->execute(array(
			'username' => $username
		));

		$result_verif = $verif->fetch(PDO::FETCH_ASSOC);

		if($result_verif['mail_key'] === "1")
		{
 			echo ("Account already verified");
 			redirect("login.php");
 			exit();
		}

	}



	$connect = connectToDatabase();

	if(!$connect)
		exit();

	if( !$_GET || !$_GET['uname'] || !$_GET['rkey'])
		exit();


	verif_account($_GET['uname'],$connect);

	$id = $connect->prepare(
		"SELECT mail_check FROM `cam_users` WHERE login = :username"
	);


	$id->execute(array(
			'username' => $_GET['uname']
		));

	$result_id = $id->fetch(PDO::FETCH_ASSOC);



	function validate_account($username,$bdd)
	{

		$validate = $bdd->prepare(
		"UPDATE `cam_users` SET `mail_key` = '1' WHERE login = :username ");

		$validate->execute(array(
			'username' => $username
		));

		if($validate){
 			echo ("Account Successfully Verified");
 			redirect("login.php");
		}
	 	else
 			echo ("An error Occured");
	}

	if ($result_id['mail_check'] === $_GET['rkey'])
		validate_account($_GET['uname'],$connect);
	else
		echo("An error Occured");
?></p>

</div>

</body>
<?php
	$rootname = getcwd();
	require_once($rootname.'/script/script.php');
  	script();
?>

</html>
