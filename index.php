<?php
	session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/index.css">
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
<?php
	$rootname = getcwd();
	require_once($rootname.'/script/script.php');
  	script();
?>
<div id="hero">
	<img src="img/inscription.png" width="100%">
<p><?php
	 if($_SESSION)
	 {
		 if($_SESSION['username'] !== "")
		 {
			 echo "You are already connected";
			 return;
		 }
	 }
	?>
</p>
</div>

<div id="popup">
<p id="ptext" style="opacity: 0;"></p>
</div>

<div id="redirect">
<p id="sendmail">Please confirm your email to finish the inscription</p>
</div>
<div id="inscription">
	<form method="post">



		<input id="first_name" type="text" placeholder="First Name">
		<input id="last_name" type="text" placeholder="Last Name">
		<input id="email" type="email" placeholder="Email">
		<input id="username" type="text" placeholder="Username">
		<input id="password" type="password" placeholder="Type Password">
		<input id="password_check" type="password" placeholder="Type Password Again">

		 <!-- id="sub" type="submit" name="s'inscrire"> -->
	</form>
	<button id="sub">Submit</button>
</div>
<!-- <div id="footer">
	<a href="app.php">app</a>
	<img src="img/yjuni.png">
</div> -->
</body>

<script type="text/javascript" src="javascript/index.js"></script>


</html>
