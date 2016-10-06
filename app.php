<?php
	session_start();
	ini_set("file_uploads","on");
	require_once("function/redirect.php");
	if($_SESSION)
	{
		if($_SESSION['username'] === "")
		{
			echo "Please Login or register";
			redirect("login.php");

			return;
		}
	}
	else {
		echo "Please Login or register";
		redirect("login.php");

			return;
	}
?>
<!DOCTYPE html>
<html id="html" data-username="<?php require_once("function/get_session.php"); echo(get_username_session());?>" data-idnumber="<?php require_once("function/get_session.php"); echo(get_id_session());?>">
<head>
<link rel="stylesheet" href="css/reset.css">
<link rel="stylesheet" type="text/css" href="css/appflex.css">
<link rel="stylesheet" type="text/css" href="css/menu.css">
<link rel="stylesheet" href="fonts/css/font-awesome.min.css">
<meta name="viewport" content="width=device-width, user-scalable=yes" />

<title>Prends Toi en photo !</title>
</head>
<body id="body">

<?php
	$rootname = getcwd();
	require_once($rootname.'/nav/menu.php');
  	menu();
?>

<p id="ntm"></p>
<div id="can1">

</div>
<canvas id="canvas"></canvas>
<!-- <img src="img/nphoto2.png" id="photo" alt="photo"> -->
<div id ="bv">
	<div id="void1">
	</div>
	<div id="webcam">
		<img id="photo" src="img/ncam.png" style="opacity:0">
		<canvas id="mask" >	</canvas>

		<video id="video"></video>
	</div>
	<div id ="void2">

	</div>
	<div id="preview">

	</div>
</div>
	<div id="remote">
		<div class="button"></div>
		<div class="button"></div>
		<div class="button"></div>
		<a href="#" class="button" id="startbutton" ><div><i id="camera" class="fa fa-camera" aria-hidden="true"></i></div></a>
		<a href="#" class="button" id="retardateur" ><div><i class="fa fa-clock-o" aria-hidden="true"></i></div></a>
		<a href="#" class="button" id="upload" ><div>	<i class="fa fa-arrow-up" aria-hidden="true"></i></div></a>
		<a href="#" class="button" id="valid_picture" style="display: none"><div ><i class="fa fa-check" aria-hidden="true"></i></div></a>
		<a href="#" class="button" id="corbeille" style="display: none"><div ><i class="fa fa-trash" aria-hidden="true"></i></div></a>
		<a href="#" class="button" id="sauvegarder" style="display: none"><div ><i class="fa fa-floppy-o" aria-hidden="true"></i></div></a>
		<div class="button"></div>
		<div class="button"></div>
		<div class="button"></div>
		<div class="button"></div>
		<div class="button"></div>
		<div class="button"></div>
		<div class="button"></div>
		<div class="button"></div>
		<div class="button"></div>
		<div class="button"></div>
		<form  method="post" enctype="multipart/form-data" id="formImage">
			<input type="file" name="imageToUpload" id="imageToUpload">
			<input type="submit" value="Upload Image" id="submitImage" name="submit">
		</form>

	</div>
	<form id="formulaire" method="post">
		<input id="dp" type="text" name="dataphoto"> </input>
		<input id="dc" type="text" name="datacanvas"> </input>
	</form>


<div id="montage">
</div>
<div id="footer">
	<img src="img/yjuni.png" />
</div>

<script type="text/javascript" src="javascript/resize_img.js"></script>

</body>
	<script type="text/javascript" src="javascript/videome.js"></script>
	<?php
		$rootname = getcwd();
		require_once($rootname.'/script/script.php');
	  	script();
	?>


</html>
