<?php
header('Content-Type: application/json');
session_start();

$path = ((array)json_decode(file_get_contents('php://input')));

str_replace("..","",$path['t_url']);

if((unlink($path['t_url']) === TRUE))
  echo(json_encode('true'));
else
  echo(json_encode('false'));

?>
