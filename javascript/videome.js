(function() {
	var form = document.getElementById('formImage');
	var imageToUpload = document.getElementById('imageToUpload');


	imageToUpload.addEventListener('change', convertImage);

	function convertImage(event) {
		var img = new Image();
		img.onload = function() {
			var reader = new FileReader();
			reader.onload = function() {
				var photo = document.querySelector('#photo');
				photo.src = reader.result;
				photo.style.opacity = 1;
				photo.style.width = "720px";
				photo.style.height = "540px";
				photo.check = 1;
			};
			reader.readAsDataURL(event.target.files[0]);
		};
		img.onerror = function() {
			alert('Please Upload a Valid File');
			photo.check = 0;
			event.target.value = '';
		};
		_URL = window.URL || window.webkitURL;
		img.src = _URL.createObjectURL(event.target.files[0]);
	}

  var streaming = false,
      video        = document.querySelector('#video'), //
      cover        = document.querySelector('#cover'),
      canvas       = document.querySelector('#canvas'),
      photo        = document.querySelector('#photo'),
      startbutton  = document.querySelector('#startbutton'),
	  upload 	   = document.querySelector('#upload'),
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
      width = 720,
      height = 540; // on definira sa plus tard

	  var options = {
		  audio: false,
		  video: true,
	  };

	  var handleStream = function(stream) {
		  if (navigator.mozGetUserMedia) {
  			 video.mozSrcObject = stream;
			if (video) {
  				video.check = 1;
  			} else {
	  			video.check = 0;
	  			startbutton.style.display = "none";
	  			retardateur.style.display = "none";
	  			upload.addEventListener('click', function(event) {
	  				document.getElementById('imageToUpload').click();
	  			});
  			}
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
		if (video.play()) {
	  		video.check = 1;
	  		upload.style.display = "none";
	    	upload.addEventListener('click', function(event) {
	    		alert('Please disable your camera');
	    	});
  		}
	};

	var handleError = function(err) {
		video.check = 0;
		startbutton.style.display = "none";
		retardateur.style.display = "none";
		upload.addEventListener('click', function(event) {
			document.getElementById('imageToUpload').click();
		});
    };

	console.log(navigator);
	console.log(navigator.appCodeName);

	if (navigator.appCodeName.includes('Mozilla')) {
		navigator.mediaDevices.getUserMedia(options).then(handleStream);
	} else {
		navigator.getMedia = ( navigator.getUserMedia ||
	                           navigator.webkitGetUserMedia ||
	                           navigator.mozGetUserMedia ||
	  						   navigator.msGetUserMedia);

		navigator.getMedia(options, handleStream, handleError);
	}

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

  function active_camera(event)
  {
       takepicture(event);// on appelle la fonction takepicture quand on cliq srr le bouton
       summon_photo_buttons("none");
       setTimeout(function()
       {
         display_picture();
	 }, 3000);
       event.preventDefault();
  }

  function active_retardateur(event)
  {
    summon_photo_buttons("none");
     setTimeout(function()
     {
       takepicture(event);// on appelle la fonction takepicture quand on cliq srr le bouton
   }, 3000);
   setTimeout(function()
   {
     display_picture();
 }, 3000);
    event.preventDefault();

  }

  function create_preview(data){
    var id = document.getElementById('html').dataset.idnumber;
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
      var display_pic = new XMLHttpRequest();
      display_pic.onreadystatechange = function() {
          if (display_pic.readyState == 4 && display_pic.status == 200) {
              const bool = JSON.parse(display_pic.responseText);
              if (bool == "true") {
                  preview.innerHTML = "no photo yet";
                  return;
              } else {
                  erase_all_child(document.getElementById('preview'));
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
    document.getElementById('valid_picture').style.display = display;
	document.getElementById('valid_picture').style.color = "green";
  }

  function summon_photo_buttons(display){
    document.getElementById('startbutton').style.display = display;
    document.getElementById('retardateur').style.display = display;
  }

function delete_picture(url)
{
  var delete_pic = new XMLHttpRequest();
  delete_pic.onreadystatechange = function(){
    if (delete_pic.readyState == 4 && delete_pic.status == 200)
    {
      const bool = JSON.parse(delete_pic.responseText);
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
    var delete_pic = new XMLHttpRequest();
    delete_pic.onreadystatechange = function() {
        if (delete_pic.readyState == 4 && delete_pic.status == 200) {
            const bool = JSON.parse(delete_pic.responseText);
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
            if (bool == "true") {
				photo.check = 0;
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
        clearcanvas(photo, mask);
        delete_picture(url);
        summon_buttons("none")
		if(video.check === 1)
        	summon_photo_buttons("");
        ev.preventDefault();
		photo.check = 0;
    }, false);
}

function listen_to_validate_image(url) {
      document.getElementById('valid_picture').addEventListener('mouseup', function validate_2(event) {
          valid_picture(url);
          clearcanvas(photo, mask);
          summon_buttons("none")
		  if(video.check === 1)
          	summon_photo_buttons("");
          display_picture();
		  this.removeEventListener('mouseup', validate_2);
      });
}

  function mergepictures(dataphoto,datamask){
    var merge = new XMLHttpRequest();
    merge.onreadystatechange = function(){
      if (merge.readyState == 4 && merge.status == 200)
      {
        const picture_data = JSON.parse(merge.responseText);
        document.getElementById("photo").setAttribute('src' , picture_data[`picture`]);
        document.getElementById("photo").style.opacity = "1";
        summon_buttons("");
        listen_to_delete_image(picture_data[`url`]);
        listen_to_validate_image(picture_data[`url`]);
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

  function takepicture(event) {
	  if(event)
		event.preventDefault();
    var form = document.querySelector('#formulaire');
    var formphoto = document.querySelector("#dp");
    var formcanvas = document.querySelector("#dc");
    canvas.width = width ;
    canvas.height = height;
	if(video.check === 1)
    	canvas.getContext('2d').drawImage(video, 0, 0, width, height); //	context.drawImage(img,x,y,width,height);
	else {
	    canvas.getContext('2d').drawImage(photo, 0, 0, width, height); //	context.drawImage(img,x,y,width,height);
	}
	var datamask = mask.toDataURL('image/png')
    var data = canvas.toDataURL('image/png');
    formcanvas.setAttribute('value', datamask);
    mergepictures(data,datamask);
    formphoto.setAttribute('value', data);
    document.getElementById('startbutton').removeEventListener('mouseup', active_camera, false);
    document.getElementById('retardateur').removeEventListener('mouseup', active_retardateur, false);
  }

  function clearcanvas(photo,mask){
    var context = mask.getContext('2d');
    photo.setAttribute('src', "img/nphoto.png");
    photo.style.opacity = "0";
    context.clearRect(0, 0, canvas.width, canvas.height);
	photo.check = 0;
	form.check = 0;
  }


  function movemask(mask, id, video, event){

	  if (photo.check === 1)
	  {
		  validate_picture.style.display = "";
		  validate_picture.style.color = "blue";
	  }

   var themask = document.getElementById(id);

   var maskcontext = mask.getContext('2d');
   var x = event.clientX - mask.offsetLeft - (themask.width * 4)/2 - mask.scrollTop ;
   var y = event.clientY - mask.offsetTop - (themask.height * 4)/2 + document.getElementById("body").scrollTop;
   mask.width = width ;
   mask.height = height;
   maskcontext.clearRect(0,0,width,height);
   maskcontext.drawImage(themask,x,y);
  }

document.body.addEventListener("click", function(event){
 var regmask = new RegExp("^m{1}[0-9]{1,3}","g");
	  if (regmask.test(event.target.id) === true)
	 {
		 if(video.check === 1)
		 {
		   var idmask = event.target.id;
		    mask.addEventListener('mousedown', function mask_active(event){
		       movemask(mask,idmask,video,event);
		       startbutton.addEventListener('mouseup', active_camera, false);
		       retardateur.addEventListener('mouseup', active_retardateur, false);
		    }, true);
		 }
		 else if(photo.check === 1)
		 {
			 var idmask = event.target.id;
			 if(form.check !== 1)
			 {
				 mask.addEventListener('mousedown', function mask_active(event){
	 		       movemask(mask,idmask,video,event);
	 		       startbutton.addEventListener('mouseup', active_camera, false);
	 		       retardateur.addEventListener('mouseup', active_retardateur, false);
	 		    }, true);


 			validate_picture.addEventListener('mouseup',function valid_upload(event){
 				 document.getElementById('submitImage').click();
				 corbeille.style.display = "";
				 this.removeEventListener('mouseup', valid_upload);
 			}, false);
			}
			if(form.check !== 1){
			form.addEventListener('submit', takepicture);
			}
			form.check = 1;
		 }
		 else
		 {
			 alert('please upload a picture or activate your camera first');
		 }
 }
  })

document.body.addEventListener("click", function(event) {
  if(Object.is(event.target.className,"delete_pic")){
    if (confirm("Are you sure you want to delete this picture ?"))
         delete_picture_from_database(event.target);
}
}, false);

display_picture();

})();
