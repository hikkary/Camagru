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
      validate_picture  = document.querySelector('#valid_picture'),
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

  function erase_all_child(node){
      node.innerHTML = "";
  }

  function create_preview(data){
    // console.log(data);
    var id = document.getElementById('html').dataset.idnumber;
    console.log(data);
    var username = document.getElementById('html').dataset.username;
    var new_picture = document.createElement("div");
    new_picture.setAttribute('id_user', data['id_user']);
    new_picture.setAttribute('id_photo', data['id_photo']);
    new_picture.style.backgroundPosition = "60% 40%" ;
    new_picture.style.backgroundColor= "white" ;
    new_picture.style.backgroundSize = "180px 135px" ;
    new_picture.style.backgroundRepeat = "no-repeat" ;
    new_picture.style.backgroundImage = "url('/"+window.location.pathname.split("/")[1]+data[`photo_url`]+"')";
    new_picture.setAttribute('class', "picture_preview");
    new_picture.style.width = "190px";
    new_picture.style.height ="175px";
    new_picture.style.border ="1px solid black";
    new_picture.style.borderWidth ="thin";
    if(id === data['id_user'])
     {
      new_picture.innerHTML = "<a href='#'' class='delete_pic' data-url=../"+data[`photo_url`]+" data-id="+data[`id_photo`]+" data-userid="+data[`id_user`]+"> x </a>";
     }
    document.getElementById('preview').appendChild(new_picture);
  }

  function display_picture() {
    erase_all_child(document.getElementById('preview'));
      var display_pic = new XMLHttpRequest();
      display_pic.onreadystatechange = function() {
          if (display_pic.readyState == 4 && display_pic.status == 200) {
              const bool = JSON.parse(display_pic.responseText);
              console.log(bool);
              if (bool == "true") {
                  preview.innerHTML = " An error occured";
                  return;
              } else {
                  console.log(bool.length);
                  for( var index = 0; index < bool.length; ++index)
                  {
                    create_preview(bool[index]);
                  }
                  return;
              }
          }
      };
      display_pic.open("POST", "ajax/display_picture.php", true);
      display_pic.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      display_pic.send(null);
  }




  function summon_buttons(display){
    document.getElementById('corbeille').style.display = display;
    document.getElementById('sauvegarder').style.display = display;
    document.getElementById('valid_picture').style.display = display;
  }

  function summon_photo_buttons(display){
    document.getElementById('startbutton').style.display = display;
    document.getElementById('retardateur').style.display = display;
    document.getElementById('upload').style.display = display;
  }

function delete_picture(url)
{
  var delete_pic = new XMLHttpRequest();
  delete_pic.onreadystatechange = function(){
    if (delete_pic.readyState == 4 && delete_pic.status == 200)
    {
      const bool = JSON.parse(delete_pic.responseText);
      console.log(bool);
      if (bool == "true"){
        return;
      }
      else {
        return;
      }
    }
  };
  const data = {
    t_url : url
  };
    delete_pic.open("POST", "ajax/delete_picture.php", true);
    delete_pic.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    delete_pic.send(JSON.stringify(data));
}

function delete_picture_from_database(cross) {
    console.log(cross.dataset.url);
    var delete_pic = new XMLHttpRequest();
    delete_pic.onreadystatechange = function() {
        if (delete_pic.readyState == 4 && delete_pic.status == 200) {
            const bool = JSON.parse(delete_pic.responseText);
            console.log(bool);
            if (bool == "true") {
              erase_all_child(document.getElementById('preview'));
              display_picture();
                return;
            } else {
              alert('an error occured');
                return;
            }
        }
    };
    const data = {
      t_url : cross.dataset.url,
      user_id : cross.dataset.userid,
      photo_id : cross.dataset.id
    }
    delete_pic.open("POST", "ajax/delete_picture_from_database.php", true);
    delete_pic.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    delete_pic.send(JSON.stringify(data));
}

function valid_picture(url) {
    var validate_pic = new XMLHttpRequest();
    validate_pic.onreadystatechange = function() {
        if (validate_pic.readyState == 4 && validate_pic.status == 200) {
            const bool = JSON.parse(validate_pic.responseText);
            console.log(bool);
            if (bool == "true") {
                return;
            } else {
                return;
            }
        }
    };
    const data = {
        t_url: url
    };
    validate_pic.open("POST", "ajax/validate_picture.php", true);
    validate_pic.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    validate_pic.send(JSON.stringify(data));
}




function listen_to_delete_image(url) {
    document.getElementById('corbeille').addEventListener('click', function(ev) {
        clearcanvas(sauvegarder, photo, mask);
        delete_picture(url);
        summon_buttons("none")
        summon_photo_buttons("");
        ev.preventDefault();
    }, false);
}

function listen_to_valdidate_image(url) {
      document.getElementById('valid_picture').addEventListener('mouseup', function(ev) {
          valid_picture(url);
          clearcanvas(sauvegarder, photo, mask);
          summon_buttons("none")
          summon_photo_buttons("");
          display_picture();
      }, true);
}

  function mergepictures(dataphoto,datamask,sauvegarder){
    var merge = new XMLHttpRequest();
    merge.onreadystatechange = function(){
      if (merge.readyState == 4 && merge.status == 200)
      {
        const picture_data = JSON.parse(merge.responseText);
        console.log(picture_data);
        document.getElementById("photo").setAttribute('src' , picture_data[`picture`]);
        document.getElementById("photo").style.opacity = "1";
        sauvegarder.setAttribute('href', picture_data);
        summon_buttons("");
        listen_to_delete_image(picture_data[`url`]);
        listen_to_valdidate_image(picture_data[`url`]);
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


  function clearcanvas(sauvegarder, photo,mask){
    var context = mask.getContext('2d');
    photo.setAttribute('src', "img/nphoto.png");
    photo.style.opacity = "0";
    context.clearRect(0, 0, canvas.width, canvas.height);
    sauvegarder.removeAttribute('href');
  }



// prise de photo
 startbutton.addEventListener('mouseup', function(ev){
    takepicture(sauvegarder);// on appelle la fonction takepicture quand on cliq srr le bouton
    summon_photo_buttons("none");
    ev.preventDefault();
  }, false);

//ecoute du clavier
 document.addEventListener("keydown",function(ev){
  	// alert(event.keyCode);
 	if (event.keyCode==13){
			takepicture(sauvegarder);
      summon_photo_buttons("none");
      ev.preventDefault();
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
        summon_photo_buttons("none");
    	ev.preventDefault();
  	}, 3000);
  }, false);

  // sauvegarder.addEventListener('click', function(ev){
  //     download(sauvegarder, canvas);// on appelle la fonction takepicture quand on cliq srr le bouton
  //   ev.preventDefault();
  // }, false);

  //effacer le canvas





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


document.body.addEventListener("click", function(ev) {
  console.log(event.target.className);
  if(Object.is(event.target.className,"delete_pic")){
    if (confirm("Are you sure you want to delete this picture ?"))
         delete_picture_from_database(event.target);
}
}, false);

display_picture();

//arreter le flux video REGLER CE PB

// poser un masque
// mask.addEventListener('click', function(ev){
//   // video.getContext('2d').drawImage("mask/iron-man.png", 0, 0, 600, 600)
//   //addimage(video);
//   ntm();
// },true);



 // iron.addEventListener('click', function(ev){

 //    // mask.getContext("2d").drawImage("mask/iron-man.png", 0, 0, 600, 600);
 //    // addimage(video);
 //    // ntm();
 //    masktocanvas(iron);
 //  },true);

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

 // Tentative arret de camera
 // console.log(video.src);
 // cam.addEventListener('click', function(ev){
 //  // vendorURL.revokeObjectURL(video);
 //  video.removeAttribute('src')
 //  stop.style.opacity = 0;
 //  },false)


})();
