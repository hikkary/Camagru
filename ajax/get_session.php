<?php
	header('Content-Type: application/json');
	session_start();

	if ($_SESSION)
	{
		if($_SESSION['username'] && $_SESSION['id'])
		{
			$sess = array("username" => $_SESSION['username'], "id" => $_SESSION['id']);
			echo(json_encode($sess));
		}
		else {
			echo(null);
		}
	}
	else {
		echo(null);
	}
?>
