<?php
	session_start();
	header('Content-Type: application/json');
	header('Content-Type: text/html; charset="iso-8859-1"');
	// ini_set("SMTP","smtp.free.fr");
	// ini_set("smtp_port","25");
	// ini_set("sendmail_from","z.kerkeb@gmail.com");

	 ini_set("SMTP","smtp.numericable.fr");
	 ini_set("smtp_port","25");
	 ini_set("sendmail_from","z.kerkeb@sfr.fr");

  $headers   = array();
	$headers[] = "MIME-Version: 1.0";
	$headers[] = "Content-type: text/plain; charset=iso-8859-1";
	$headers[] = "From: My Cam Hero - Do Not Reply <z.kerkeb@sfr.fr>";
	$headers[] = "Reply-To: Admin <zk.yonjuni@gmail.com>";
	$headers[] = "X-Mailer: PHP/".phpversion();

	$value = ((array)json_decode(file_get_contents('php://input')));

	require_once('../config/function_sql.php');

	$connect = connectToDatabase();

	if(!$connect)
		exit();

//recuperer la cle

	function forgot_mail_create($pseudo, $key)
	{
		$path1 = $_SERVER['HTTP_HOST'];
		$path2 = array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1);

		$message = '
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
		"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
		<html xmlns:v="urn:schemas-microsoft-com:vml">
      <head>
      </head>
      <body>
       <p>Hi.'.$pseudo.'</p>
       <p>To change your password, click on the link Below</p>
       <a href='.$path1.'/'.$path2[1].'/change_password.php?rkey='.$key.'&uname='.$pseudo.'>change my password</a>
       </body>
    </html>
    ';
    return($message);
	}

	 if(mail($value['mail'],"Forgotten Password",forgot_mail_create($value['login'], $value['mail_check']), implode("\r\n",$headers)) !== false)
	 	echo(json_encode("false"));
	 else
	 	echo(json_encode("true"));
	?>
