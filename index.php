<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/index.css">
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
<div id="hero">
	<img src="img/inscription.png" width="100%">
</div>
<div id="inscription">
	<form  action="#" method="post">
		<input id="email" type="email" placeholder="Email">

		<input id="username" type="text" placeholder="Username">
		<input id="first_name" type="text" placeholder="First Name">
		<input id="last_name" type="text" placeholder="Last Name">
		<input id="password" type="password" placeholder="Mot de passe">
		<input id="sub" type="submit" name="s'inscrire">
	</form>
</div>
<!-- <div id="footer">
	<a href="app.php">app</a>
	<img src="img/yjuni.png">
</div> -->
</body>
<script type="text/javascript" src="javascript/index.js"></script>
</html>
 