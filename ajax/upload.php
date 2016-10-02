<?php
	$target_dir = "tmp/";
	$target_file = $target_dir.basename($_FILES["imageToUpload"]["name"]);
	$upload_ok = 1;
	$image_file_type = pathinfo($target_file,PATHINFO_EXTENSION);
	var_dump($_FILES);
	if(isset($_POST["submit"]))
		$check = getimagesize($_FILES["imageToUpload"]['tmp_name']);
		if($check !== false){

			 echo(json_encode("true"));
		}
		else {
			echo(json_encode("true"));
		}
?>
