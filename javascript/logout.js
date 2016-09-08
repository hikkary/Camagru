var login = document.getElementById('croix');
var link =  document.getElementById('link_croix');

console.log(link);

function login_logout(croix, link){
  croix.setAttribute('class',"fa fa-times");
  link.setAttribute('href',"logout.php");
}


function logout(login, link){
  var log = new XMLHttpRequest();
  log.onreadystatechange = function(){
    if(log.readyState == 4 && log.status == 200)
    {
        const bool = JSON.parse(log.responseText);
        console.log(bool);
        if(bool == "true")
        {
          alert("pas connecter");
        }
        else {
          login_logout(login, link);
        }
    }
  };
  log.open("POST", "ajax/islog.php",true);
  log.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  log.send(null);
}

logout(login, link);
