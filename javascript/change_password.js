 var password = document.getElementById('password');
 var password_check = document.getElementById('password_check');
 var username = document.getElementById('username');
 var message = document.getElementById('message');

 function include(fileName){
   document.write("<script type='text/javascript' src='javascript/"+fileName+"'></script>" );
 }

include("function.js");

function change_password(password,username,rkey){
  var password_change = new XMLHttpRequest();
  password_change.onreadystatechange = function(){
    if (password_change.readyState == 4 && password_change.status == 200)
    {
      const bool = JSON.parse(password_change.responseText);
      console.log(bool);
      if (bool == "true")
      {
          changetext("An error Occured",document.getElementById('message'),"red",document.getElementById('message').innerHTML);
      }
      else
      {
        changetext("Password successfully updated",document.getElementById('message'),"black",document.getElementById('message').innerHTML);
        setTimeout(function(){
            window.location.href= "login.php";
        },1000);
      }
    }
  };
  const data = {
    t_password : password.value,
    t_username : username.value
  };
  password_change.open("POST", "ajax/aj_change_password.php", true);
  password_change.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  password_change.send(JSON.stringify(data));

}


password.addEventListener('blur', function(ev){
  if (regex_password(password) === true)
    allgreen(password);
  else
  {
    var error = "Password : 8 character, 1 uppercase & 1 number";
    changetext(error,message,"red",message.innerHTML);
    allred(password);
    // errorpopup(password,popup, error);
  }
  if (password.value.length === 0)
    recovery(password,"black");
}, true);

password_check.addEventListener('input', function(ev){
  if (password_compare(password, password_check) === true && regex_password(password) === true)
    allgreen(password_check);
  else
    allred(password_check);

  if (password_check.value.length === 0)
    recovery(password_check, "black");
}, true);

submit.addEventListener('click',function(ev){
	if(password.value.length === 0 || password_check.value.length === 0 )
	{
    var formfill = "Please fill all the form";
		changetext(formfill,message,"red",message.innerHTML);
		return;
	}
  else if (regex_password(password) === false ) {
    var error_password = "Password : 8 character, 1 uppercase & 1 number";
    changetext(error_password,message,"red",message.innerHTML);
    return;
  }
  else if (password_compare(password, password_check) === false) {
      var password_match = "Passwords does not match";
      changetext(password_match,message,"red",message.innerHTML);
      return;
  }
	 else
    change_password(password,username,rkey);
  	// mail_forgot(username.value);
},true);
