<?php
	header('Content-Type: application/json');
	require_once('../config/function_sql.php');

	$connect = connectToDatabase();

	if(!$connect)
		exit();

	$user = $connect->prepare(
		"SELECT * FROM `photo` ORDER BY `date_creation` DESC"
		);

	$user->execute();

	$result = $user->fetchAll(PDO::FETCH_ASSOC);

	$i = 0;
	foreach ($result as $key => $value) {

		if((file_exists("..".$value['photo_url'])) === false)
		{
			unset($result[$i]);
		}
		$i++;

	}
	if(!$result)
	{
		// faire redirection page d'erreur
		echo (json_encode("true"));
		return;
	}
	else
	{
		echo (json_encode(array_values($result)));
	}
?>
