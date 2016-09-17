// function erase_all_child(node){
//     node.innerHTML = "";
// }
//
// function create_preview(data){
//   // console.log(data);
//   var id = document.getElementById('html').dataset.id;
//   var username = document.getElementById('html').dataset.username;
//   var new_picture = document.createElement("div");
//   new_picture.setAttribute('id_user', data['id_user']);
//   new_picture.setAttribute('id_photo', data['id_photo']);
//   new_picture.style.backgroundPosition = "60% 40%" ;
//   new_picture.style.backgroundColor= "white" ;
//   new_picture.style.backgroundSize = "180px 135px" ;
//   new_picture.style.backgroundRepeat = "no-repeat" ;
//   new_picture.style.backgroundImage = "url('/"+window.location.pathname.split("/")[1]+data[`photo_url`]+"')";
//   new_picture.setAttribute('class', "picture_preview");
//   new_picture.style.width = "190px";
//   new_picture.style.height ="175px";
//   new_picture.style.border ="1px solid black";
//   new_picture.style.borderWidth ="thin";
//   if(id === data['id_user'])
//    {
//     new_picture.innerHTML = "<a href='#'' class='delete_pic' data-url=../"+data[`photo_url`]+" data-id="+data[`id_photo`]+" data-userid="+data[`id_user`]+"> x </a>";
//    }
//   document.getElementById('preview').appendChild(new_picture);
// }
//
// function display_picture() {
//     var display_pic = new XMLHttpRequest();
//     display_pic.onreadystatechange = function() {
//         if (display_pic.readyState == 4 && display_pic.status == 200) {
//             const bool = JSON.parse(display_pic.responseText);
//             console.log(bool);
//             if (bool == "true") {
//                 preview.innerHTML = " An error occured";
//                 return;
//             } else {
//                 console.log(bool.length);
//                 for(var index in bool)
//                 {
//                   create_preview(bool[index]);
//                 }
//                 return;
//             }
//         }
//     };
//     display_pic.open("POST", "ajax/display_picture.php", true);
//     display_pic.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     display_pic.send(null);
// }
