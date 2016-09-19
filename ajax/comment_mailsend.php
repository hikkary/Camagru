<?php
function get_username($id, $connect)
{
	$username = $connect->prepare(
	"SELECT `login`,`mail` FROM `cam_users` WHERE id_users = :user_id "
);

	$username->execute(array(
		'user_id' => $id
	));

	$result = $username->fetch(PDO::FETCH_ASSOC);
	return($result);
}

header('Content-Type: application/json');
require_once('../config/function_sql.php');

$connect = connectToDatabase();

if(!$connect)
	exit();

	header('Content-Type: application/json');
	header('Content-Type: text/html; charset="iso-8859-1"');

	ini_set("SMTP","smtp.sfr.fr");
	ini_set("smtp_port","25");
	ini_set("sendmail_from","z.kerkeb@sfr.fr");

  $headers   = array();
	$headers[] = "MIME-Version: 1.0";
	$headers[] = "Content-type: text/plain; charset=iso-8859-1";
	$headers[] = "From: My Cam Hero -  Do Not Reply <z.kerkeb@sfr.fr>";
	// $headers[] = "Reply-To: Admin <zk.yonjuni@gmail.com>";
	$headers[] = "X-Mailer: PHP/".phpversion();

	$value = ((array)json_decode(file_get_contents('php://input')));

	function new_comment_mail_create($pseudo)
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
       <p>You have a new comment in your picture</p>
       </body>
    </html>
    ';
    return($message);
	}
	// print_r($value);

	$result = get_username($value['iduser'],$connect);

	 if(mail($result['mail'],"New Comment on your picture",new_comment_mail_create($result['login']), implode("\r\n",$headers)) !== false)
	 	echo(json_encode("true"));
	 else
	 	echo(json_encode("false"));
	?>
