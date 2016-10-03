<?php
	if(isset($_POST["submit"]))
		$check = getimagesize($_FILES["imageToUpload"]['tmp_name']);
		if($check !== false){

			 echo(json_encode("true"));
		}
		else {
			echo(json_encode("true"));
		}
?>
