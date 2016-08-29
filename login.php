<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/login.css">
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
<p> Login </p>
<form method="post">
		<input id="username" type="text" placeholder="Username or Email">
		<input id="password" type="password" placeholder="Type Password">
		 <!-- id="sub" type="submit" name="s'inscrire"> -->
	</form>
</div>
<div id="inscription">

</div>
</body>
<script type="text/javascript" src="javascript/index.js"></script>
</html>
 