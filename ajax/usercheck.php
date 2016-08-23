<?php
	header('Content-Type: application/json');
	
	require_once('../config/function_sql.php');
	
	$connect = connectToDatabase();

	if(!$connect)
		exit();

	$users = ((array)json_decode(file_get_contents('php://input')));

	$tableau_users = $connect->prepare( 
		"SELECT login FROM `cam_users`"
		);

	$tableau_users->execute();

	$result = $tableau_users->fetchAll(PDO::FETCH_COLUMN,0);

	foreach ($result as $value) 
	{
		if($users['username'] === $value)
		{
			echo(json_encode("true"));
			 exit();
		}
	}
 	echo (json_encode("false"));

	
?>