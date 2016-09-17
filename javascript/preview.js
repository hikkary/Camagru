(function(){

 //  var preview = document.getElementById('preview');
 //  console.log(window.location.pathname);
 //
 //  var ace = window.location.pathname;
 //
 //  ace.split("/");
 //
 //  console.log(ace.split("/")[1]);
 //  function include(fileName){
 //    document.write("<script type='text/javascript' src='javascript/"+fileName+"'></script>" );
 //  }
 //
 // include("refresh.js");



  // function get_session()
  // {
  //   var session = new XMLHttpRequest();
  //   session.onreadystatechange = function() {
  //       if (session.readyState == 4 && session.status == 200) {
  //         const bool = JSON.parse(session.responseText);
  //           // console.log(bool);
  //           if (bool) {
  //             console.log('ok');
  //             return (bool);
  //           } else {
  //             return (null);
  //           }
  //       }
  //   };
  //   session.open("POST", "ajax/get_session.php", true);
  //   session.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //   session.send(null);
  // }
  //
  // var ok = get_session();
  // console.log(ok);
  //
//   function erase_all_child(node){
//       node.innerHTML = "";
//   }
//
//   function create_preview(data){
//     // console.log(data);
//     var id = document.getElementById('html').dataset.idnumbers;
//     var username = document.getElementById('html').dataset.username;
//     var new_picture = document.createElement("div");
//     new_picture.setAttribute('id_user', data['id_user']);
//     new_picture.setAttribute('id_photo', data['id_photo']);
//     new_picture.style.backgroundPosition = "60% 40%" ;
//     new_picture.style.backgroundColor= "white" ;
//     new_picture.style.backgroundSize = "180px 135px" ;
//     new_picture.style.backgroundRepeat = "no-repeat" ;
//     new_picture.style.backgroundImage = "url('/"+window.location.pathname.split("/")[1]+data[`photo_url`]+"')";
//     new_picture.setAttribute('class', "picture_preview");
//     new_picture.style.width = "190px";
//     new_picture.style.height ="175px";
//     new_picture.style.border ="1px solid black";
//     new_picture.style.borderWidth ="thin";
//     if(id === data['id_user'])
//      {
//       new_picture.innerHTML = "<a href='#'' class='delete_pic' data-url=../"+data[`photo_url`]+" data-id="+data[`id_photo`]+" data-userid="+data[`id_user`]+"> x </a>";
//      }
//     document.getElementById('preview').appendChild(new_picture);
//   }
//
//
//   function delete_picture(cross) {
//       console.log(cross.dataset.url);
//       var delete_pic = new XMLHttpRequest();
//       delete_pic.onreadystatechange = function() {
//           if (delete_pic.readyState == 4 && delete_pic.status == 200) {
//               const bool = JSON.parse(delete_pic.responseText);
//               console.log(bool);
//               if (bool == "true") {
//                 erase_all_child(document.getElementById('preview'));
//                 display_picture();
//                   return;
//               } else {
//                 alert('an error occured');
//                   return;
//               }
//           }
//       };
//       const data = {
//         t_url : cross.dataset.url,
//         user_id : cross.dataset.userid,
//         photo_id : cross.dataset.id
//       }
//       delete_pic.open("POST", "ajax/delete_picture_from_database.php", true);
//       delete_pic.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//       delete_pic.send(JSON.stringify(data));
//   }
//
//   function display_picture() {
//     erase_all_child(document.getElementById('preview'));
//       var display_pic = new XMLHttpRequest();
//       display_pic.onreadystatechange = function() {
//           if (display_pic.readyState == 4 && display_pic.status == 200) {
//               const bool = JSON.parse(display_pic.responseText);
//               console.log(bool);
//               if (bool == "true") {
//                   preview.innerHTML = " An error occured";
//                   return;
//               } else {
//                   console.log(bool.length);
//                   for(var index in bool)
//                   {
//                     create_preview(bool[index]);
//                   }
//                   return;
//               }
//           }
//       };
//       display_pic.open("POST", "ajax/display_picture.php", true);
//       display_pic.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//       display_pic.send(null);
//   }
//   display_picture();
//   // listen_to_delete_preview(okfunc);
//
//   document.body.addEventListener("click", function(ev) {
//     console.log(event.target.className);
//     if(Object.is(event.target.className,"delete_pic")){
//       if (confirm("Are you sure you want to delete this picture ?"))
//            delete_picture(event.target);
// }
// }, false);


})();
