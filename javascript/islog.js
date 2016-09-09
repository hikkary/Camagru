var login = document.getElementById('croix');
var link =  document.getElementById('link_croix');

console.log(link);

function logout(){
  var log_out = new XMLHttpRequest();
  log_out.onreadystatechange = function(){
    if(log_out.readyState == 4 && log_out.status == 200)
    {
        const bool = JSON.parse(log_out.responseText);
        console.log(bool);
        if(bool == "true")
        {
          // alert("pas connecter");
          login_logout(login, link, 1);
        }
        else {
          login_logout(login, link, 0);
        }
    }
  };
  log_out.open("POST", "ajax/logout.php",true);
  log_out.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  log_out.send(null);

}

function login_logout(croix, link, state){
  console.log(state);
  if(state == 1)
    {
      croix.setAttribute('class',"fa fa-sign-in");
      link.setAttribute('href',"login.php");
      croix.setAttribute('title' ,"Login")
    }
    else if (state == 0) {
       console.log('ace');
       croix.setAttribute('class',"fa fa-times");
       link.setAttribute('href',"#");
       croix.setAttribute('title' ,"Logout");
       link.addEventListener('click',function(ev){
       logout();
      }, true)
    }

}


function islog(login, link){
  var log = new XMLHttpRequest();
  log.onreadystatechange = function(){
    if(log.readyState == 4 && log.status == 200)
    {
        const bool = JSON.parse(log.responseText);
        console.log(bool);
        if(bool == "true")
        {
          // alert("pas connecter");
          login_logout(login, link, 1);
        }
        else {
          login_logout(login, link, 0);
        }
    }
  };
  log.open("POST", "ajax/islog.php",true);
  log.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  log.send(null);
}

islog(login, link);
