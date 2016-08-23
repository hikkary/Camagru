<?php

header('Content-Type: application/json');

$mail = ((array)json_decode(file_get_contents('php://input')));


if(filter_var($mail['email'], FILTER_VALIDATE_EMAIL) === false)
	echo(json_encode("true"));
else
	echo(json_encode("false"));

?>