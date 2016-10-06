<?php
	session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/change_password.css">
	<link rel="stylesheet" href="css/menu.css">
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
<p id="message"><?php
require_once('config/function_sql.php');



$connect = connectToDatabase();

if(!$connect)
{
	echo "An error occured";
	exit();
}

if($_GET['uname'] === "" || $_GET['rkey'] === ""){
	echo "Invalid Username or Key";
	exit();
}
	$result_id = username_check($connect,$_GET['uname']);

	if ($result_id['mail_check'] === $_GET['rkey'])
		echo "Please enter your new password";
	else{
		echo "An error occured";
		exit();
	}
?>

  </p>
<form id="decathlon" method="post">
		<input id="username" type="text" placeholder="Username or Email" value=<?php echo $_GET['uname'] ?> >
		<input id="rkey" type="text" placeholder="Username or Email" value=<?php echo $_GET['rkey'] ?> >
		<input id="password" type="password" placeholder="type password">
		<input id="password_check" type="password" placeholder="type password again">
		<div id="submit">
		<a href="#"><p>Submit</p>
		</div></a>
	</form>
</div>

</body>
<script type="text/javascript" src="javascript/change_password.js"></script>
<?php
	$rootname = getcwd();
	require_once($rootname.'/script/script.php');
  	script();
?>

</html>
