<?php

	try{
		require_once('database.php');
		$connect = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
	} catch (PDOException $e) {
		echo "Connection Failed, like your life :" . $e->getMessage();
	}

	if(!$connect)
		exit();

	$users = $connect->query(
	  "CREATE TABLE IF NOT EXISTS cam_users(\n"
    . " id_users INT NOT NULL AUTO_INCREMENT,\n"
    . " first_name VARCHAR(128) NOT NULL,\n"
    . " last_name VARCHAR(128) NOT NULL,\n"
    . " login VARCHAR(255) NOT NULL,\n"
    . " mail VARCHAR(255) NOT NULL,\n"
    . " mail_check INT NOT NULL DEFAULT 0,\n"
    . " PRIMARY KEY(id_users));");


	if(!$users)
		exit('TABLE users FAILED TO CREATE');
	else 
		echo "TABLE users SUCESSFULLY CREATED";
	
	
	?>