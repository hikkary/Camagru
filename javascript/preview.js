(function(){

  var preview = document.getElementById('preview');

  function create_preview(data){
    console.log(data);
    var new_picture = document.createElement("div");
    // newcanvas.style.position = "absolute";
    new_picture.style.backgroundColor = "yellow";
    new_picture.setAttribute('class', "picture_preview");
    new_picture.style.width = "180px";
    new_picture.style.height ="135px";
    new_picture.style.border ="1px solid black";
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
