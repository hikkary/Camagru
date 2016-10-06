<?php
	header('Content-Type: application/json');
	require_once('../config/function_sql.php');

	$connect = connectToDatabase();

	if(!$connect)
		exit();


	$user = $connect->prepare(
		"SELECT * FROM `mask` "
		);

	$user->execute();

	$result = $user->fetchAll(PDO::FETCH_ASSOC);


	if(!$result)
	{
		echo (json_encode("true"));
		return;
	}
	else
	{
		echo (json_encode($result));
	}
?>
