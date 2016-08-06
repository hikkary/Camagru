(function() {

  var streaming = false,
      video        = document.querySelector('#video'), //
      cover        = document.querySelector('#cover'),
      canvas       = document.querySelector('#canvas'),
      photo        = document.querySelector('#photo'),
      startbutton  = document.querySelector('#startbutton'),
      corbeille	   = document.querySelector('#corbeille'),
      retardateur  = document.querySelector('#retardateur'),
  	  sauvegarder  = document.querySelector('#sauvegarder'),
  	  cam  = document.querySelector('#cam'),
  	  stop = document.querySelector('#stop'),
      mask = document.querySelector('#m1'),
      create = document.querySelector('#newcanvas'),
      k = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
 	  n = 0,
  	  // clavier 	   = event.which,

      width = 720,
      height = 0; // on definira sa plus tard

  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia); // recupere la video de la cam selon les navigateurs

  navigator.getMedia(
    {
      video: true,
      audio: false // et je coupe le son
    },
    function(stream) {
      // if (navigator.mozGetUserMedia) {
      //   video.mozSrcObject = stream;
      // } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      // }
      video.play();

      // Tentative arret de camera
      // console.log(video.src);
      // cam.addEventListener('click', function(ev){
      //  // vendorURL.revokeObjectURL(video);
      //  video.removeAttribute('src')
      //  stop.style.opacity = 0;
      //  },false)
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );

  video.addEventListener('canplay', function(ev){
    if (!streaming) { // streaming sera false par defaut, on l'active uniquement apres avoir lancer la video pour pouvoir recupere correctement la taille
      height = video.videoHeight / (video.videoWidth/width);// on choppe la hauteur ici qu'on avait mis a zero tout a lheure
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      console.log(video.getAttribute('src'));
      streaming = true;
    }
  }, false);

  // function download(sauvegarder, canvas)
  // {
 	// 	window.location.assign(sauvegarder); 	
  //  }

  function takepicture(sauvegarder) {
  	
    var wesh = document.querySelector("#wesh")
  	// console.log(d);
  	var ladate = new Date();
  	var jour = ladate.getDate();
  	var mois = ladate.getMonth() + 1;
  	var an = ladate.getFullYear();
  	var heure = ladate.getHours();
  	var min = ladate.getMinutes();
  	var sec = ladate.getSeconds();
  	canvas.width = width ;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height); //	context.drawImage(img,x,y,width,height);
    if(wesh)
      canvas.getContext('2d').drawImage(wesh, 0, 0, width, height); // context.drawImage(img,x,y,width,height); 
    var data = canvas.toDataURL('image/png');
  	sauvegarder.setAttribute('href', data);
  	sauvegarder.setAttribute('download', "CamHero "+jour+"-"+mois+"-"+an+" "+heure+"h"+min+"m"+sec);
  
    // photo.setAttribute('src', data);
  }

  function clearcanvas(sauvegarder){
    canvas  = document.querySelector('#canvas'),
    context = canvas.getContext("2d");
    canvas.width = width ;
    canvas.height = height;
    context.clearRect(0,0,width,height);
    sauvegarder.removeAttribute('href');
  }




  function addimage(){
    var newcanvas = document.createElement("canvas");
    newcanvas.style.position = "absolute";
    newcanvas.setAttribute("id", "wesh");

    if (height != 0)
      newcanvas.height = height;
    else
      newcanvas.height = 540;

    newcanvas.width = width;

    create.appendChild(newcanvas);
    // canvas  = document.querySelector('#canvas'),
     context = newcanvas.getContext("2d");
     newcanvas.getContext('2d').drawImage(mask, 0, 0, mask.width, mask.height); // context.drawImage(img,x,y,width,height);
     var data = newcanvas.toDataURL('image/png');
  }



// prise de photo
 startbutton.addEventListener('click', function(ev){
      takepicture(sauvegarder);// on appelle la fonction takepicture quand on cliq srr le bouton
    ev.preventDefault();
  }, false);

//ecoute du clavier
 document.addEventListener("keydown",function(ev){
 	// alert(event.keyCode);
 	if (event.keyCode==13){
			takepicture(sauvegarder);
	}
	if (event.keyCode==46){
			clearcanvas(sauvegarder);
	}
 },true);

// photo apres 3 seconde
  retardateur.addEventListener('click', function(ev){
     setTimeout(function()
     {
      	takepicture(sauvegarder);// on appelle la fonction takepicture quand on cliq srr le bouton
    	ev.preventDefault();
  	}, 3000);
  }, false);

  // sauvegarder.addEventListener('click', function(ev){
  //     download(sauvegarder, canvas);// on appelle la fonction takepicture quand on cliq srr le bouton
  //   ev.preventDefault();
  // }, false);

  //effacer le canvas
  corbeille.addEventListener('click', function(ev){
  	clearcanvas(sauvegarder);
  	ev.preventDefault();
  }, false);

  //arreter le flux video REGLER CE PB 
  
  // poser un masque
  mask.addEventListener('click', function(ev){
    // video.getContext('2d').drawImage("mask/iron-man.png", 0, 0, 600, 600)
    addimage(video);
  },false);

})();