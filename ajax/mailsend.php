<?php
	header('Content-Type: application/json');
	header('Content-Type: text/html; charset="iso-8859-1"');
	ini_set("SMTP","smtp.numericable.fr");
	ini_set("smtp_port","25");
	ini_set("sendmail_from","z.kerkeb@sfr.fr");	

    $headers   = array();
	$headers[] = "MIME-Version: 1.0";
	$headers[] = "Content-type: text/plain; charset=iso-8859-1";
	$headers[] = "From: My Cam Hero - Do Not Reply <z.kerkeb@sfr.fr>";
	$headers[] = "Reply-To: Admin <zk.yonjuni@gmail.com>";
	$headers[] = "X-Mailer: PHP/".phpversion();


	// var_dump($_SERVER);
	$value = ((array)json_decode(file_get_contents('php://input')));


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
       <a href='.$path1.'/'.$path2[1].'/ajax/mail_keycheck.php?rkey='.$key.'&uname='.$pseudo.'>Become a Hero</a>
       </body>
    </html>
    ';
    return($message);
	}

	 if(mail($value['email'],"Finish Your Inscription",validation_mail_create($value['uname'], $value['rkey']), implode("\r\n",$headers)) !== false)
	 	echo(json_encode("false"));
	 else
	 	echo(json_encode("true"));
	?>