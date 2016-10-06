<?php
	session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/forgot.css">
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
<p id="message"> Please enter your Username or Email </p>
<form id="decathlon" method="post">
		<input id="username" type="text" placeholder="Username or Email">
		<div id="submit">
		<a href="#"><p>Submit</p>
		</div></a>
	</form>
</div>

</body>
<script type="text/javascript" src="javascript/forgot.js"></script>
<?php
	$rootname = getcwd();
	require_once($rootname.'/script/script.php');
  	script();
?>

</html>
