(function(){

  var preview = document.getElementById('preview');

  function erase_all_child(node){
      node.innerHTML = "";
  }

  // window.open('index.php','fenetre','width=650,height=500');
  // function get_data_like()
  // {
  //   var display_pic = new XMLHttpRequest();
  //   display_pic.onreadystatechange = function() {
  //       if (display_pic.readyState == 4 && display_pic.status == 200) {
  //           const bool = JSON.parse(display_pic.responseText);
  //           console.log(bool);
  //           if (bool) {
  //               return(bool);
  //           } else {
  //               return;
  //           }
  //       }
  //   };
  //   display_pic.open("POST", "ajax/display_picture.php", true);
  //   display_pic.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //   display_pic.send(null);
  // }

  function return_number_like(data)
  {
    var like = JSON.parse(data['liked']);
    if(data[`liked`] === null)
      return(0);
    else {
      return(like.length);
    }
  }

  function return_number_comments(data)
  {
    if(data[`comments`] === null)
      return(0);
    else {
      return(1);
    }
  }

  function display_comments(data)
  {
    // console.log(data);
    // var comments_zone = document.getElementsByClassName('comments_zone');
    // console.log(index);

     if(data['comments'] === null)
        return("<p>No comment yet</p>");
      else {
        return("<p>sisi la famine</p>")
      }
  }

  function create_preview(data){

    var id = document.getElementById('html').dataset.idnumber;
    //  console.log(id);
    //  console.log(data[`id_user`]);
    var username = document.getElementById('html').dataset.username;
    var new_picture = document.createElement("div");
    new_picture.setAttribute('id_user', data['id_user']);
    new_picture.setAttribute('id_photo', data['id_photo']);
    new_picture.style.backgroundPosition = "50% 10%" ;
    new_picture.style.backgroundColor= "white" ;
    new_picture.style.backgroundSize = "648px 486px" ;
    new_picture.style.backgroundRepeat = "no-repeat" ;
    new_picture.style.backgroundImage = "url('/"+window.location.pathname.split("/")[1]+data[`photo_url`]+"')";
    new_picture.setAttribute('class', "picture_preview");
    new_picture.style.width = "720px";
    new_picture.style.height ="780px";
    new_picture.style.border ="1px solid black";
    new_picture.style.borderWidth ="thin";
    if(id === data[`id_user`])
     {
      new_picture.innerHTML = "<a href='#' class='delete_pic' data-url=../"+data[`photo_url`]+" data-id="+data[`id_photo`]+" data-userid="+data[`id_user`]+"> x </a>";
     }
     if (id !== "")
     {
       new_picture.innerHTML += "<a href='#' class='liked' data-id="+data[`id_photo`]+" data-userid="+data[`id_user`]+"> <i class='fa fa-heart-o' aria-hidden='true'></i> &nbsp"+  return_number_like(data)+" </a>";
      //  new_picture.innerHTML += "<a href='#' class='number_liked' data-id="+data[`id_photo`]+"data-userid="+data[`id_user`]+" >"+return_number_like(data)+"</i> </a>";
       new_picture.innerHTML += "<a href='#' class='comments' data-id="+data[`id_photo`]+"> <i class='fa fa-comments' aria-hidden='true'></i> &nbsp"+return_number_comments(data)+" </a>";
       new_picture.innerHTML += "<div class='comments_zone' data-id="+data[`id_photo`]+">"+display_comments(data)+"</div>"
       new_picture.innerHTML += "<div class='comments_write' data-id="+data[`id_photo`]+"><form method='post'><input type='text' name='comment' maxlength='100' placeholder='write a comment' </form></div>"

      //  new_picture.innerHTML += "<a href='#' class='number_comments' data-id="+data[`id_photo`]+">"+return_number_comments(data)+"</i> </a>";
     }
    //  <form method='post'><input type='text' name='comment' maxlength='100' </form>
    document.getElementById('preview').appendChild(new_picture);
  }


  function delete_picture(cross) {
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

  function display_picture() {
      var display_pic = new XMLHttpRequest();
      display_pic.onreadystatechange = function() {
          if (display_pic.readyState == 4 && display_pic.status == 200) {
              const bool = JSON.parse(display_pic.responseText);
              console.log(bool);
              if (bool == "true") {
                  preview.innerHTML = " No Photo Yet";
                  return;
              } else {
                  console.log(bool.length);
                  erase_all_child(document.getElementById('preview'));
                  for( var index = 0; index < bool.length; ++index)
                  {
                    create_preview(bool[index],index);
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
  // listen_to_delete_preview(okfunc);

// function update_like(photo_id)
// {
//     var photo = document.getElementById(photo_id);
//
//     console.log(photo);
// }

function like_picture(element) {
      var liked = new XMLHttpRequest();
      liked.onreadystatechange = function() {
          if (liked.readyState == 4 && liked.status == 200) {
              const bool = JSON.parse(liked.responseText);
              console.log(bool);
              if (bool == "true") {
                // erase_all_child(document.getElementById('preview'));
                display_picture();
                  return;
              } else {
                  // alert('like');
                  return;
              }
          }
      };
      const data = {
        id_photo : element.parentNode.dataset.id,
        id_user : document.getElementById('html').dataset.idnumber
      }
      liked.open("POST", "ajax/like_picture.php", true);
      liked.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      liked.send(JSON.stringify(data));
  }



  document.body.addEventListener("click", function(ev) {
    console.log(event.target.className);
    if(Object.is(event.target.className,"delete_pic")){
      if (confirm("Are you sure you want to delete this picture ?"))
           delete_picture(event.target);
      }
    if(Object.is(event.target.className,"fa fa-heart-o")){
             like_picture(event.target);
}
}, false);


})();


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
