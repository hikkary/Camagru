(function(){

  var preview = document.getElementById('preview');

  console.log(window.location.pathname);

  var ace = window.location.pathname;

  ace.split("/");

  console.log(ace.split("/")[1]);


  function get_session()
  {
    var session = new XMLHttpRequest();
    session.onreadystatechange = function() {
        if (session.readyState == 4 && session.status == 200) {
          const bool = JSON.parse(session.responseText);
            // console.log(bool);
            if (bool) {
              console.log('ok');
              return (bool);
            } else {
              return (null);
            }
        }
    };
    session.open("POST", "ajax/get_session.php", true);
    session.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    session.send(null);
  }

  var ok = get_session();
  console.log(ok);


  function create_preview(data){
    // console.log(data);
    // var id = get_session();
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
    // if(id['id'] === data['id_user'])
    // {
      new_picture.innerHTML = "<a href ='#'> <i class='fa fa-times' aria-hidden='true'></i> </a>";
    // }
    document.getElementById('preview').appendChild(new_picture);
  }



  function display_picture() {
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
                  for(var index in bool)
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
  display_picture();



})();
