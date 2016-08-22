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
      mask = document.querySelector('#mask'),
      iron = document.querySelector('#m1'),
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

    //   function ntm(){
  //   var request = new XMLHttpRequest(); // on initialise un nouvel objet XMLHttpRequest() qui permet de converser avec le serveur
  //   request.onreadystatechange = function() { //stocke une fonction qui sera appeler si l'etat la propriete readyState change
  //     if (request.readyState == 4 && request.status == 200) // les etats vont de 1 a 4, voir http://www.w3schools.com/ajax/ajax_xmlhttprequest_onreadystatechange.asp pour plus d'info, le 200 signifie que le statut de la requete/page est "ok"
  //     {
  //       const errors = JSON.parse(request.responseText); //errors stock les donnee renvoyer par la page php
  //       console.log(errors); 
  //       document.getElementById("ntm").innerHTML = errors['fawfawf']; // je place dans la balise dont l'idee est ntm , la case fawfawf du tableau envoyer au php
  //     }
  //   };
  //   const data = {
  //     test : "coucou",
  //     fawfawf : "lol"
  //   };
  //   request.open("POST", "./javascript/supp.php", true);//  http://www.w3schools.com/ajax/ajax_xmlhttprequest_send.asp
  //   request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //   request.send(JSON.stringify(data)); // on envoi rien en cas de GET et une string en cas de POST
  // }




  function mergepictures(dataphoto,datamask,sauvegarder){
    var merge = new XMLHttpRequest();
    merge.onreadystatechange = function(){
      if (merge.readyState == 4 && merge.status == 200)
      {
        const picture_data = JSON.parse(merge.responseText);
        document.getElementById("photo").setAttribute('src' , picture_data);
        sauvegarder.setAttribute('href', picture_data);
        return(picture_data);
      }
      };
      const data = {
        picture : dataphoto,
        canvas : datamask
      }
    merge.open("POST", "ajax/merge.php", true);//  http://www.w3schools.com/ajax/ajax_xmlhttprequest_send.asp
    merge.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    merge.send(JSON.stringify(data)); // on envoi rien en cas de GET et une string en cas de POST
    };
  

  //creer une fonction qui renvoi une str de la date.

  function takepicture(sauvegarder) {
  	// console.log(d);
    var form = document.querySelector('#formulaire');
    var formphoto = document.querySelector("#dp");
    var formcanvas = document.querySelector("#dc");
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
    var datamask = mask.toDataURL('image/png')
    var data = canvas.toDataURL('image/png');
    formcanvas.setAttribute('value', datamask);
    mergepictures(data,datamask,sauvegarder);
    formphoto.setAttribute('value', data);
    sauvegarder.setAttribute('download', "CamHero "+jour+"-"+mois+"-"+an+" "+heure+"h"+min+"m"+sec);
  }


  function clearcanvas(sauvegarder, photo){
    photo.setAttribute('src', "img/nphoto.png");
    sauvegarder.removeAttribute('href');
  }

  // function addimage(){
    // var newcanvas = document.createElement("canvas");
    // newcanvas.style.position = "absolute";
    // newcanvas.setAttribute("id", "wesh");

    // if (height != 0)
    //   newcanvas.height = height;
    // else
    //   newcanvas.height = 540;

    // newcanvas.width = width;

    // create.appendChild(newcanvas);
  //    newcanvas  = document.querySelector('#mask'),
  //    context = newcanvas.getContext("2d");
  //    newcanvas.getContext('2d').drawImage(mask, 0, 0, mask.width, mask.height); // context.drawImage(img,x,y,width,height);
  //    var data = newcanvas.toDataURL('image/png');
  // }



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
			clearcanvas(sauvegarder,photo);
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
  	clearcanvas(sauvegarder,photo);
  	ev.preventDefault();
  }, false);

  //arreter le flux video REGLER CE PB

  // poser un masque
  // mask.addEventListener('click', function(ev){
  //   // video.getContext('2d').drawImage("mask/iron-man.png", 0, 0, 600, 600)
  //   //addimage(video);
  //   ntm();
  // },true);



  function masktocanvas(themask){
    var contextmask = mask.getContext("2d");
    contextmask.drawImage(themask,360,220);
  }

  function movemask(mask, themask,video){
   var maskcontext = mask.getContext('2d'); 
   var x = event.clientX - mask.offsetLeft - (themask.width * 4)/2 - mask.scrollTop ;
   var y = event.clientY - mask.offsetTop - (themask.height * 4)/2 + document.getElementById("body").scrollTop;

   // console.log(document.getElementById("body").scrollTop);
   // console.log(mask.offsetLeft);
   // console.log(mask.offsetTop);
   // console.log(x);
   // console.log(y);

  
   mask.width = width ;
   mask.height = height;
   maskcontext.clearRect(0,0,width,height);
   maskcontext.drawImage(themask,x,y);
   // mask.addEventListener('click', function(ev){
   //   // alert('Vous avez cliqué au point de coordonnés: ' + x + ', ' + y );
   // },true);

  }

mask.addEventListener('mousedown', function(ev){
   movemask(mask,iron,video);
}, true);

 // iron.addEventListener('click', function(ev){

 //    // mask.getContext("2d").drawImage("mask/iron-man.png", 0, 0, 600, 600);
 //    // addimage(video);
 //    // ntm();
 //    masktocanvas(iron);
 //  },true);



})();
