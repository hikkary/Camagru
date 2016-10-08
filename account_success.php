<!-- Validate the  user's mail -->
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/menu.css">
	<link rel="stylesheet" href="css/asuccess.css">
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
<p id="sendmail">Your mail has been succesfully verified</p>
</div>
<div id="inscription">

</div>
</body>
<script type="text/javascript" src="javascript/index.js"></script>
<?php
	$rootname = getcwd();
	require_once($rootname.'/script/script.php');
  	script();
?>

</html>
