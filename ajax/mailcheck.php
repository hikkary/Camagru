<?php
	header('Content-Type: application/json');
	
	require_once('../config/function_sql.php');
	
	$connect = connectToDatabase();

	if(!$connect)
		exit();

	$mail = ((array)json_decode(file_get_contents('php://input')));

	$tableau_mail = $connect->prepare( 
		"SELECT mail FROM `cam_users`"
		);

	$tableau_mail->execute();

	$result = $tableau_mail->fetchAll(PDO::FETCH_COLUMN,0);

	foreach ($result as $value) 
	{
		if($mail['email'] === $value)
		{
			echo(json_encode("true"));
			 exit();
		}
	}
 	echo (json_encode("false"));

	
?>
