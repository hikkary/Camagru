<?php
	ini_set("SMTP","smtp.numericable.fr");
	ini_set("smtp_port","25");
	ini_set("sendmail_from","z.kerkeb@sfr.fr");	

	$mail = "z.kerkeb@gmail.com";
	// Detection de boite mail
	if (!preg_match("#^[a-z0-9._-]+@(hotmail|live|msn).[a-z]{2,4}$#", $mail))
	{
		$new_line = "\r\n";
	}
	else
	{
		$new_line = "\n";
	}
	$message_txt = "Salut à tous, voici un e-mail envoyé par un script PHP.";
	$message_html = "<html><head></head><body><b>Salut à tous</b>, voici un e-mail envoyé par un <i>script PHP</i>.</body></html>";
	// $boundary = "-----=".md5(rand());
	 $boundary ="allo";

	// 			Declaration header
	$headers = "From: My Cam Hero - Do Not Reply <z.kerkeb@sfr.fr>".$new_line;
	$headers.= "Reply-To: Admin <zk.yonjuni@gmail.com>".$new_line;
	$headers.= "MIME-Version: 1.0".$new_line;
	$headers.= "Content-Type: multipart/alternative;".$new_line."boundary=\"$boundary\"".$new_line;
	$headers.= "X-Mailer: PHP/".phpversion();

 
//=====Création du message.
$message = $new_line."--".$boundary.$new_line;
//=====Ajout du message au format texte.
$message.= "Content-Type: text/plain; charset=\"ISO-8859-1\"".$new_line;
$message.= "Content-Transfer-Encoding: 8bit".$new_line;
$message.= $new_line.$message_txt.$new_line;
$message.= $new_line."--".$boundary.$new_line;
//=====Ajout du message au format HTML
$message.= "Content-Type: text/html; charset=\"ISO-8859-1\"".$new_line;
$message.= "Content-Transfer-Encoding: 8bit".$new_line;
$message.= $new_line.$message_html.$new_line;
//==========
$message.= $new_line."--".$boundary."--".$new_line;
$message.= $new_line."--".$boundary."--".$new_line;
//==========
 
//=====Envoi de l'e-mail.
mail($mail,"finish your inscription","zebi",$headers);
//==========