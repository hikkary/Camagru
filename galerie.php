<?php
	session_start();
?>
<!DOCTYPE html>
<html id="html" data-username="<?php require_once("function/get_session.php"); echo(get_username_session());?>" data-idnumber="<?php require_once("function/get_session.php"); echo(get_id_session());?>"">
<head>
<link rel="stylesheet" type="text/css" href="css/galerie.css">
<link rel="stylesheet" type="text/css" href="css/menu.css">
<link rel="stylesheet" href="fonts/css/font-awesome.min.css">
<link rel="stylesheet" href="css/reset.css">
<meta name="viewport" content="width=device-width, user-scalable=yes" />

<title>Hero Gallery! </title>
</head>
<body id="body">

<?php
	$rootname = getcwd();
	require_once($rootname.'/nav/menu.php');
  	menu();
?>
<div id="preview">
</body>
	<script type="text/javascript" src="javascript/preview.js"></script>
	<!-- <script type="text/javascript" src="javascript/videome.js"></script> -->
	<?php
		$rootname = getcwd();
		require_once($rootname.'/script/script.php');
	  	script();
	?>


</html>
