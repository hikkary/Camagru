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
<!-- <img src="img/gcam.png"> -->
<video id="video"></video>
<img src="img/nphoto.png" id="photo" alt="photo">
<button id="startbutton">
<i id="camera" class="fa fa-camera" aria-hidden="true"></i>
</button>
<button id="upload">
<i class="fa fa-arrow-up" aria-hidden="true"></i>
</button>
</div>
</div>
<canvas id="canvas"></canvas>
<div id="montage">
<p>Ace</p>
</div>
</body>
	<script type="text/javascript" src="javascript/videome.js"></script>
</html>