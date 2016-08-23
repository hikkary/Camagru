<?php

header('Content-Type: application/json');

$value = ((array)json_decode(file_get_contents('php://input')));

$length = strlen($value['string']);

if($length < 2 || $length > 60)
	echo(json_encode("true"));
else
	echo(json_encode("false"));

?>