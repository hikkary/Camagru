<?php
	
	require_once('database.php');

	try{
		echo($DB_DSN)."\n";
		echo($DB_USER)."\n";
		echo($DB_PASSWORD)."\n";	
		$connect = new PDO($DB_DSN,$DB_USER,$DB_PASSWORD);
	} catch (PDOException $e) {
		echo "Connection Failed, like your life :" . $e->getMessage();
	}
?>