<?php
	// echo 'test';
	// $post = json_decode(file_get_contents('php://stdin'));
	// var_dump($_POST);
	// $post = json_decode('php://input');
	// $post2 = json_decode('php://stdin');

	// echo $post."   ".$post2;

	// echo $_POST[fname]."   ".$_POST[lname];
	// var_dump($post);
	// var_dump($_REQUEST);
	// var_dump($post2);
$name = $_POST[lname];
$lname = $_POST[fname];

$data = ((array)json_decode(file_get_contents('php://input')));
header('Content-Type: application/json');
echo(json_encode($data));

?>
