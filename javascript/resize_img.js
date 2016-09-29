(function(){

  var montage = document.querySelector('#montage');

  function display_mask() {
      var display_mask = new XMLHttpRequest();
      display_mask.onreadystatechange = function() {
          if (display_mask.readyState == 4 && display_mask.status == 200) {
              const bool = JSON.parse(display_mask.responseText);
              console.log(bool);
              if (bool == "true") {
                  preview.innerHTML = " No Mask";
                  return;
              } else {
                  console.log(bool.length);
                  // erase_all_child(document.getElementById('preview'));
                  // create_preview(bool[0],0);
                  for( var index = 0; index <  bool.length; index++)
                  {
                    var element = document.createElement("a");
                    var img = document.createElement("img");
                    // console.log(bool);
                    console.log(bool[index]['mask_url']);
                    img.setAttribute("src",bool[index]['mask_url']);
                    img.setAttribute("id", "m"+index);
                    img.style.height = "100px";
                    img.style.width = "100px";
                    element.setAttribute('href', '#');
                    element.appendChild(img);
                    montage.appendChild(element);
                  }

                  // console.log(tableau);
                  // if (tableau[1])
                  // {
                  //   document.getElementById('preview').appendChild(tableau[1]);
                  // }
//                     console.log(tableau);
                    // document.getElementById('preview').appendChild(tableau[0]);
                    // active_form();
                    // pagination(tableau, 1, 0);
                    return;
              }
          }
      };
      display_mask.open("POST", "ajax/display_mask.php", true);
      display_mask.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      display_mask.send(null);
  }

display_mask();
//
//  var nombre_masque = document.images;
//  var i;
//  var y = 1;
// //   console.log("m"+y)
//  for (var i = 2; i < nombre_masque.length; i++) {
// //  		console.log(nombre_masque[i].id)
//  		document.getElementById("m"+y).style.heigth = "100px";
//  		document.getElementById("m"+y).style.width = "100px";
//  		document.getElementById("m"+y).addEventListener('click', function(ev){
//  			tocanvas("m"+y);
// },true)
//  		y++;
// }
//
//
//   function tocanvas(id_masque){
//   	console.log(id_masque);
//     var masque = document.getElementById(id_masque);
//     var canvas = document.querySelector("#mask");
//     var contextmask = canvas.getContext("2d");
//     contextmask.drawImage(masque,360,220);
// }

// nombre_masque.addEventListener('click', function(ev){
// 	alert('ntm');
// },true)


})();
