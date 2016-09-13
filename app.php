<?php
	session_start();
?>
<!DOCTYPE html>
<html>
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
	<div id="preview">

	</div>
</div>
	<div id="remote">
		<div class="button"></div>
		<div class="button"></div>
		<div class="button"></div>
		<div class="button" id="startbutton"><i id="camera" class="fa fa-camera" aria-hidden="true"></i></div>
		<div class="button" id="retardateur">	<i class="fa fa-clock-o" aria-hidden="true"></i></div>
		<div class="button" id="upload">	<i class="fa fa-arrow-up" aria-hidden="true"></i></div>
		<div class="button" id="valid_picture" style="display: none"><i class="fa fa-check" aria-hidden="true"></i></div>
		<div class="button" id="corbeille" style="display: none"><i class="fa fa-trash" aria-hidden="true"></i></div>
		<div class="button" id="sauvegarder" style="display: none"><i class="fa fa-floppy-o" aria-hidden="true"></i></div>
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
	</div>
	<form id="formulaire" action="merge.php" method="post">
		<input id="dp" type="text" name="dataphoto"> </input>
		<input id="dc" type="text" name="datacanvas"> </input>
	</form>
		<!-- <video id="video"></video>


		<img id="ncam" src="img/ncam.png">
		<canvas id="canvas"></canvas>


		<button id="cam">
			<i id="stop" class="fa fa-ban" aria-hidden="true"></i>
			<i class="fa fa-video-camera" aria-hidden="true"></i>
		</button>

		<button id="retardateur">
			<i class="fa fa-clock-o" aria-hidden="true"></i>
		</button>

		<form id="formulaire" action="merge.php" method="post">
		<button id="startbutton">
			<i id="camera" class="fa fa-camera" aria-hidden="true"></i>
		</button>
		<input id="dp" type="text" name="dataphoto"> </input>
		<input id="dc" type="text" name="datacanvas"> </input>
		</form>
		<button id="upload">
			<i class="fa fa-arrow-up" aria-hidden="true"></i>
		</button>

		<button id="corbeille">
			<i class="fa fa-trash" aria-hidden="true"></i>
		</button>

		<a id="sauvegarder">
			<button>
				<i class="fa fa-floppy-o" aria-hidden="true"></i>
			</button>
		</a> -->


<div id="montage">

	<img id="m1" src="mask/iron-man.png" >
	<img id="m2" src="mask/captain-america.png" >
	<form action="javascript/supp.php" method="post">
	<script type="text/javascript" src="javascript/resize_img.js"></script>
</div>
</body>
	<script type="text/javascript" src="javascript/videome.js"></script>
	<?php
		$rootname = getcwd();
		require_once($rootname.'/script/script.php');
	  	script();
	?>


</html>
