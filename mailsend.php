<?php
	header('Content-Type: text/html; charset="iso-8859-1"');
	ini_set("SMTP","smtp.numericable.fr");
	ini_set("smtp_port","25");
	ini_set("sendmail_from","z.kerkeb@sfr.fr");	

	// $headers = 	'From: z.kerkeb@sfr.fr' . "\r\n" .
 //     'Reply-To: zk.yonjuni@gmail.com' . "\r\n" .
 //     'MIME-Version: 1.0' . "\r\n".
 //     'X-Mailer: PHP/' . phpversion();

    $headers   = array();
	$headers[] = "MIME-Version: 1.0";
	$headers[] = "Content-type: text/plain; charset=iso-8859-1";
	$headers[] = "From: My Cam Hero - Do Not Reply <z.kerkeb@sfr.fr>";
	$headers[] = "Reply-To: Admin <zk.yonjuni@gmail.com>";
	$headers[] = "X-Mailer: PHP/".phpversion();


	var_dump($_SERVER);


	function validation_mail_create($pseudo, $key)
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
       <p>To verify your mail, click on the link Below</p>
       <a href='.$path1.'/'.$path2[1].'/app.php?key='.$key.'&uname='.$pseudo.'>Become a Hero</a>
       </body>
    </html>
    ';
    return($message);
	}

	 mail($_GET['mail'],"Finish Your Inscription",validation_mail_create("zak", "6986"), implode("\r\n",$headers));
	// ini_set("SMTP","localhost");
	// echo($rootname)."\n";
	// redirect("app.php");
	// var_dump($rootpath);


?>