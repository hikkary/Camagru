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

	function username_check($connect,$username)
	{
		$id = $connect->prepare(
			"SELECT mail_check FROM `cam_users` WHERE login = :username OR mail = :username"
		);

		$id->execute(array(
				'username' => $username
			));

		$result_id = $id->fetch(PDO::FETCH_ASSOC);

		return($result_id);
	}


?>
