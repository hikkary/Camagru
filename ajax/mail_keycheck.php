<?php
	// header('Content-Type: application/json');
	
	require_once('../config/function_sql.php');
	
	$connect = connectToDatabase();

	if(!$connect)
		exit();
	

?>