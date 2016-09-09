<?php
	session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/login.css">
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

<!-- <div id="hero">
	<img src="img/inscription.png" width="100%">
</div> -->

<div id="redirect">
<p id="message"> <?php
	if($_SESSION)
	{
		if($_SESSION['username'] !== "")
		{
			echo "You are already connected";
			return;
		}
		else {
			echo "Login";
		}
	}
	else {
		echo "Login";
	}
 ?> </p>
<form id="decathlon" method="post">
		<input id="username" type="text" placeholder="Username or Email">
		<input id="password" type="password" placeholder="Type Password">
		<div id="submit">
		<a href="#"><p>Submit</p>
		</div></a>
		<a id="forgot" href="forgot.php">I forgot my password</a>
		 <!-- id="sub" type="submit" name="s'inscrire"> -->
	</form>
</div>

</body>
<script type="text/javascript" src="javascript/login.js"></script>
</html>
