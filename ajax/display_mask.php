<?php
	header('Content-Type: application/json');
	require_once('../config/function_sql.php');

	$connect = connectToDatabase();

	if(!$connect)
		exit();

	//  $users = ((array)json_decode(file_get_contents('php://input')));

	$user = $connect->prepare(
		"SELECT * FROM `mask` "
		);

	$user->execute();

	$result = $user->fetchAll(PDO::FETCH_ASSOC);

	// print_r($result);
	// var_dump($result);

	if(!$result)
	{
		// faire redirection page d'erreur
		echo (json_encode("true"));
		return;
	}
	else
	{
		echo (json_encode($result));
	}
?>
