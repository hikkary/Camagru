(function(){
  // event = event || window.event;
  var preview = document.getElementById('preview');

  function erase_all_child(node){
      node.innerHTML = "";
  }

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
    var comments = JSON.parse(data['comments']);
    if(data[`comments`] === null)
      return(0);
    else {
      return(comments.length);
    }
  }

  function refresh_comments(data)
  {
    // console.log(data[0]);
    if(data['comment'] === null)
       return("<p>No comment yet</p>");
    else {
      // var comments = JSON.parse(data);
      var tableau = [];
      for(var index = 0; index < data.length; index++)
      {
//           console.log(comments[index]['id_user']);
        tableau[index] = data[index]['id_user']+" : "+data[index]['comment']+'<br>';
      }
      return(tableau);
    }
  }

  function display_comments(data)
  {
     if(data['comments'] === null)
        return("<p>No comment yet</p>");
      else {
        var comments = JSON.parse(data['comments']);
        var tableau = [];
        for(var index = 0; index < comments.length; index++)
        {
//           console.log(comments[index]['id_user']);
          tableau[index] = comments[index]['id_user']+" : "+comments[index]['comment']+'<br>';
        }
        return(tableau);
      }
  }

  function send_mail_comment(id) {
      var comment_send = new XMLHttpRequest();
      comment_send.onreadystatechange = function() {
          if (comment_send.readyState == 4 && comment_send.status == 200) {
              const bool = JSON.parse(comment_send.responseText);
            //   console.log(bool);
              if (bool == "true") {
                  // alert('non non non non non');
                  return;
              }
          	}
  				};
          const data = {
              iduser: id
          };
          comment_send.open("POST", "ajax/comment_mailsend.php", true);
          comment_send.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          comment_send.send(JSON.stringify(data));
        }

  function comment_picture(element) {
        var comment = new XMLHttpRequest();
        comment.onreadystatechange = function() {
            if (comment.readyState == 4 && comment.status == 200) {
                const bool = JSON.parse(comment.responseText);
                // console.log(bool);
                if (bool) {
                  // alert('ok');
                  // erase_all_child(document.getElementById('preview'));
                  // display_picture();
                  document.getElementsByClassName('comments_zone')[0].innerHTML = refresh_comments(bool);
                  document.getElementsByClassName('comments')[0].innerHTML = "<i class='fa fa-comments' aria-hidden='true'></i> &nbsp"+bool.length;
                  element.value = "";
                //   console.log(document.getElementsByClassName('comments_zone')[0]);
                  // element.innerHTML += "<a href='#' class='liked' data-id="+data[`id_photo`]+" data-userid="+data[`id_user`]+"> <i class='fa fa-heart-o' aria-hidden='true'></i> &nbsp"+  return_number_like(data)+" </a>";
                  send_mail_comment(element.dataset.userid);
                    return;
                } else {
                    // alert('like');
                    return;
                }
            }
        };
        const data = {
          id_photo : element.parentNode.dataset.id,
          id_user : document.getElementById('html').dataset.username,
          comment : element.value
        }
        comment.open("POST", "ajax/comment_picture.php", true);
        comment.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        comment.send(JSON.stringify(data));
    }


  function create_preview(data,index){

    var id = document.getElementById('html').dataset.idnumber;
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
       new_picture.innerHTML += "<a href='#' class='comments' data-id="+data[`id_photo`]+"> <i class='fa fa-comments' aria-hidden='true'></i> &nbsp"+return_number_comments(data)+" </a>";
       new_picture.innerHTML += "<div class='comments_zone' data-id="+data[`id_photo`]+">"+display_comments(data)+"</div>"
       new_picture.innerHTML += "<div class='comments_write' data-id="+data[`id_photo`]+"><form  data-id="+data[`id_photo`]+"  method='post'><input class='form_comment' data-userid="+data[`id_user`]+" type='text' name='comment' maxlength='100' placeholder='write a comment' </form></div>"
     }
    // document.getElementById('preview').appendChild(new_picture);

    return(new_picture);
  }

  // function display_img(img)
  // {
  //   erase_all_child(document.getElementById('preview'));
  //   document.getElementById('preview').appendChild();
  // }


  function active_form()
  {
    var form = document.getElementsByClassName('form_comment')[0];

    if(form !== undefined)
    {
      form.addEventListener('keyup', function(){
        if (event.keyCode == 13 && form.value.length > 0)
        {
          comment_picture(form);
        }
      }, false);
    }
}


  function event_manager(tableau,page,preview)
  {
    if(event.target.dataset.index){
      // document.removeEventListener('click', event_manager, true);
      erase_all_child(preview);
      preview.appendChild(tableau[event.target.dataset.index - 1]);
      // console.log(event.target.formactive);
      // if(event.target.formactive != 1)
      // {
         active_form();
        //  event.target.formactive = 1;
      // }
      // document.removeEventListener('click', event_manager, true);

      return;
    }
    if(event.target.dataset.nextindex) //finir sa
    {
    //   console.log("ace");
      erase_all_child(page);
      erase_all_child(preview);
      preview.appendChild(tableau[Number(event.target.dataset.nextindex - 1)] );
      pagination(tableau,Number(event.target.dataset.nextindex), 1 );
      return;
    }
    if(event.target.dataset.formerindex)
    {
      erase_all_child(page);
      erase_all_child(preview);
      preview.appendChild(tableau[Number(event.target.dataset.formerindex) - 1] );
      pagination(tableau,Number(event.target.dataset.formerindex - 19), 1);
      return;
    }
  }

  function pagination(tableau,index,key)
  {
    // document.removeEventListener('click', event_manager, true);
    document.removeEventListener('click', function(event){
        event_manager(tableau,page, preview)},true);

    var page = document.getElementById('pagination');
    var preview = document.getElementById('preview');
    page.style.display = "flex";
    if (index !== 1)
    {
      var element = document.createElement("a");
      element.setAttribute('href', '#');
      element.innerHTML = "<<";
      element.setAttribute('data-formerindex', index - 1);
      page.appendChild(element);
    }
    for(var i = index; i < index + 20 && i <= tableau.length ; i++)
        {
//           console.log(i);
          var element = document.createElement("a");
          element.setAttribute('href', '#');
          // element.innerHTML = i + 1;
          element.innerHTML = i ;
          element.setAttribute('data-index', element.innerHTML);
          // console.log(element);
          page.appendChild(element);

        }
//         console.log(i);
//         console.log(tableau[i]);
        if(tableau[i])
        {
          var element = document.createElement("a");
          element.setAttribute('href', '#');
          element.innerHTML = ">>";
          // element.setAttribute('class', 'next');
          element.setAttribute('data-nextindex', i);
          page.appendChild(element);
        }

        if(key === 0)
        {
          document.addEventListener('click', function(event){
            event_manager(tableau,page, preview)},true);
        }
    }



  function delete_picture(cross) {
    //   console.log(cross.dataset.url);
      var delete_pic = new XMLHttpRequest();
      delete_pic.onreadystatechange = function() {
          if (delete_pic.readyState == 4 && delete_pic.status == 200) {
              const bool = JSON.parse(delete_pic.responseText);
            //   console.log(bool);
              if (bool == "true") {
                erase_all_child(document.getElementById('preview'));
				erase_all_child(document.getElementById('pagination'));
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
//               console.log(bool);
              if (bool == "true") {
                  preview.innerHTML = " No Photo Yet";
                  return;
              } else {
//                   console.log(bool.length);
                  erase_all_child(document.getElementById('preview'));
                  // create_preview(bool[0],0);
                  var tableau = [];
                  for( var index = 0; index <  bool.length; index++)
                  {
                    tableau[index] = create_preview(bool[index],index);
                  }

                  // console.log(tableau);
                  // if (tableau[1])
                  // {
                  //   document.getElementById('preview').appendChild(tableau[1]);
                  // }
//                     console.log(tableau);
                    document.getElementById('preview').appendChild(tableau[0]);
                    active_form();
                    pagination(tableau, 1, 0);
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
            //   console.log(bool);
              if (bool) {
                // console.log(bool.length);
                // element.parentNode.innerHTML = "";

                element.parentNode.innerHTML = "<i class='fa fa-heart-o' aria-hidden='true'></i> &nbsp"+ bool.length;

                //  erase_all_child(document.getElementById('preview'));
                // display_picture();
                // element.innerHTML="zebi";
                  return;
              } else {
                   alert('error');
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



  document.body.addEventListener("click", function(event) {
//     console.log(event.target.className);

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
