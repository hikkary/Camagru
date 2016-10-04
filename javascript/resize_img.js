(function(){

  var montage = document.querySelector('#montage');

  function display_mask() {
      var display_mask = new XMLHttpRequest();
      display_mask.onreadystatechange = function() {
          if (display_mask.readyState == 4 && display_mask.status == 200) {
              const bool = JSON.parse(display_mask.responseText);
              if (bool == "true") {
                  preview.innerHTML = " No Mask";
                  return;
              } else {
                  for( var index = 0; index <  bool.length; index++)
                  {
                    var element = document.createElement("a");
                    var img = document.createElement("img");
                    img.setAttribute("src",bool[index]['mask_url']);
                    img.setAttribute("id", "m"+index);
                    img.style.height = "100px";
                    img.style.width = "100px";
                    element.setAttribute('href', '#');
                    element.appendChild(img);
                    montage.appendChild(element);
                  }
                    return;
              }
          }
      };
      display_mask.open("POST", "ajax/display_mask.php", true);
      display_mask.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      display_mask.send(null);
  }

display_mask();
})();
