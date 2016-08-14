<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="css/reset.css">
<link rel="stylesheet" type="text/css" href="css/app.css">
<link rel="stylesheet" href="fonts/css/font-awesome.min.css">
	<title>Prends Toi en photo !</title>
</head>
<body>

<div id = top-app>
<img src="img/logo.png" >
<i id="croix" class="fa fa-times" aria-hidden="true" title="Deconnexion"></i>
<i id="album" class="fa fa-picture-o" aria-hidden="true" title="Album"></i>
<!-- <p>Deconnexion</p> -->
</img>
</div>
<div id ="bv">
	<div id ="v">
		<video id="video"></video>
			<div id ="newcanvas">
				<canvas id="mask" height="540" width="720" style="position: absolute;">
				</canvas>
	</div>
		<img id="ncam" src="img/ncam.png">
		<canvas id="canvas">
		<?php
			if($_POST["dataphoto"] || $_POST["datacanvas"])
			{

			}
		?>

		</canvas>
		<img src="img/nphoto.png" id="photo" alt="photo">

		<button id="cam">
			<i id="stop" class="fa fa-ban" aria-hidden="true"></i>
			<i class="fa fa-video-camera" aria-hidden="true"></i>
		</button>

		<button id="retardateur">
			<i class="fa fa-clock-o" aria-hidden="true"></i>
		</button>

		<form id="formulaire" action="app.php" method="post">
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
		</a>
	</div>
</div>

<div id="montage">
	<img id="m1" src="mask/prev-iron-man.png">

</div>
	<?php
		var_dump($_POST);
	?>
</body>
	<script type="text/javascript" src="javascript/videome.js"></script>
	<script type="text/javascript" src="javascript/paint.js"></script>
</html>


