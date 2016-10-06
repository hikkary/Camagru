<?php
	header('Content-Type: application/json');
	header('Content-Type: text/html; charset="iso-8859-1"');

	ini_set("SMTP","smtp-relay.gmail.com");
	ini_set("smtp_port","25");
	ini_set("sendmail_from","z.kerkeb@gmail.com");


  $headers   = array();
	$headers[] = "MIME-Version: 1.0";
	$headers[] = "Content-type: text/plain; charset=iso-8859-1";
	$headers[] = "From: My Cam Hero - Do Not Reply <z.kerkeb@sfr.fr>";
	$headers[] = "Reply-To: Admin <zk.yonjuni@gmail.com>";
	$headers[] = "X-Mailer: PHP/".phpversion();

	$value = ((array)json_decode(file_get_contents('php://input')));

	function validation_mail_create($pseudo, $key)
	{
		$path1 = $_SERVER['HTTP_HOST'];
		$path2 = array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1);

		$message = 'Hi '.$pseudo.'
       To verify your mail, click on the link Below
       '.$path1.'/'.$path2[1].'/mail_keycheck.php?rkey='.$key.'&uname='.$pseudo;

    return($message);
	}

	 if(mail($value['email'],"Finish Your Inscription",validation_mail_create($value['uname'], $value['rkey']), implode("\r\n",$headers)) !== false)
	 	echo(json_encode("false"));
	 else
	 	echo(json_encode("true"));
	?>
