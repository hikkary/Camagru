(function() {

  var streaming = false,
      video        = document.querySelector('#video'), //
      cover        = document.querySelector('#cover'),
      canvas       = document.querySelector('#canvas'),
      photo        = document.querySelector('#photo'),
      startbutton  = document.querySelector('#startbutton'),
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
      streaming = true;
    }
  }, false);

  function takepicture() {
    canvas.width = width ;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width/2, height/2); //	context.drawImage(img,x,y,width,height);
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  startbutton.addEventListener('click', function(ev){
      takepicture();// on appelle la fonction takepicture quand on cliq srr le bouton
    ev.preventDefault();
  }, false);

})();