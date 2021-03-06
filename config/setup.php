<?php

date_default_timezone_set('Europe/Paris');
	require_once('function_sql.php');

	$connect = connectToDatabase();


	if(!$connect)
		die("Failed to connect");


	$users = $connect->query(
	  "CREATE TABLE IF NOT EXISTS cam_users(\n"
    . " id_users INT NOT NULL AUTO_INCREMENT,\n"
    . " first_name VARCHAR(128) NOT NULL,\n"
    . " last_name VARCHAR(128) NOT NULL,\n"
    . " login VARCHAR(255) NOT NULL,\n"
    . " password VARCHAR(255) NOT NULL,\n"
    . " mail VARCHAR(255) NOT NULL,\n"
    . " mail_check INT NOT NULL DEFAULT 0,\n"
    . " mail_key INT NOT NULL,\n"
	. " mask VARCHAR(255),\n"
    . " PRIMARY KEY(id_users)) ENGINE=InnoDB;");



	if(!$users)
		exit('TABLE users FAILED TO CREATE'."\n");
	else
		echo "TABLE users SUCESSFULLY CREATED"."\n";

		$mask = $connect->query(
			"CREATE TABLE IF NOT EXISTS mask(\n"
			. " id_mask INT NOT NULL AUTO_INCREMENT,\n"
			. " mask_url VARCHAR(255) NOT NULL,\n"
			. " PRIMARY KEY(id_mask)) ENGINE=InnoDB;");

			if(!$mask)
				exit('TABLE mask FAILED TO CREATE'."\n");
			else
				echo "TABLE mask SUCESSFULLY CREATED"."\n";

			$photo = $connect->query(
					"CREATE TABLE IF NOT EXISTS photo(\n"
					. " id_photo INT NOT NULL AUTO_INCREMENT,\n"
					. " id_user INT NOT NULL,\n"
					. " photo_url VARCHAR(255) UNIQUE NOT NULL,\n"
					. " date_creation DATETIME NOT NULL,\n"
					. " comments LONGTEXT ,\n"
					. " liked LONGTEXT,\n"
					. " FOREIGN KEY(id_user) REFERENCES cam_users(id_users) ON DELETE CASCADE,\n"
					. " PRIMARY KEY(id_photo)) ENGINE=InnoDB;");

					if(!$photo)
						exit('TABLE photo FAILED TO CREATE'."\n");
					else
						echo "TABLE photo SUCESSFULLY CREATED"."\n";

				$addmask = $connect->query(
				"INSERT INTO `mask` (`id_mask`, `mask_url`) VALUES (NULL,'mask/m1.png'),(NULL,'mask/m2.png'),(NULL,'mask/m3.png'),(NULL,'mask/m4.png'),(NULL,'mask/m5.png'),(NULL,'mask/m6.png'),(NULL,'mask/m7.png')"	);

			if(!$addmask)
				exit('FAILED TO ADD MASKS'."\n");
			else
				echo "MASKS SUCESSFULLY ADDED"."\n";

	?>
