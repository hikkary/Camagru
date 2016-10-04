<?php

	function connectToDatabase()
	{
		try{
			require_once('database.php');
			$connect = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
			$connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
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

	function get_like($connect, $likes)
	{
	  $like = $connect->prepare(
	  "SELECT `liked` FROM `photo` WHERE id_photo = :photo_id "
	  );

	  $like->execute(array(
	     'photo_id' => $likes['id_photo']
	  ));

	  $result = $like->fetch(PDO::FETCH_ASSOC);

	  return ($result);
	}

?>
