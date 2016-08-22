<?php

	function connectToDatabase()
	{
		try{
			require_once('database.php');
			$connect = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
			return($connect);
		} catch (PDOException $e) {
			echo "Connection Failed, like your life :" . $e->getMessage();
		}
	}

?>