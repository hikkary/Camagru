<?php
	header('Content-Type: text/html; charset="iso-8859-1"');

	echo(ini_get('SMTP'));
	ini_set("SMTP","smtp.numericable.fr");
	ini_set("smtp_port","25");
	echo(ini_get('SMTP'));
	echo(ini_get('smtp_port'));
	ini_set("sendmail_from","z.kerkeb@sfr.fr");	
	echo(ini_get('sendmail_from'));	


	$headers = 	'From: z.kerkeb@sfr.fr' . "\r\n" .
     'Reply-To: zk.yonjuni@gmail.com' . "\r\n" .
     'X-Mailer: PHP/' . phpversion();

	var_dump($_GET);
	mail($_GET['mail'],"Finish Your Inscription","Wesh Morray", $headers);
	// ini_set("SMTP","localhost");
	// echo($rootname)."\n";
	// redirect("app.php");
	// var_dump($rootpath);


?>