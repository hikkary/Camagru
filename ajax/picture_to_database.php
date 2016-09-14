<?php
header('Content-Type: application/json');

require_once('../config/function_sql.php');

$connect = connectToDatabase();

if(!$connect)
  exit();

$mail = ((array)json_decode(file_get_contents('php://input')));

?>
