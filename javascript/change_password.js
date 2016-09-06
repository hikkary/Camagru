 var password = document.getElementById('password');
 var password_check = document.getElementById('password_check');
 var message = document.getElementById('message');

 function include(fileName){
   document.write("<script type='text/javascript' src='javascript/"+fileName+"'></script>" );
 }

include("function.js");

 function changetext(message,element,color,original_message)
 {
 	element.innerHTML = message;
 	element.style.color = color;
 	if(original_message)
 	{
 		setTimeout(function(){
 			changetext(original_message,element,"black", null);
 		},3000);
 	}
 }

//  function mail_forgot_send(data){
//    var error = "An error Occured";
//    var mail_forgot = new XMLHttpRequest();
//  	mail_forgot.onreadystatechange = function(){
//  		if (mail_forgot.readyState == 4 && mail_forgot.status == 200)
//  		{
//  			const bool = JSON.parse(mail_forgot.responseText);
//  			console.log(bool);
//  			if(bool == "false")
//       {
//         alert('mail sent ! ')
//       }
//       else
//        {
//  				changetext(error,document.getElementById('message'),"red", null);
//        }
//  		}
//  	};
//  	mail_forgot.open("POST","ajax/forgot_mail.php",true);
//   mail_forgot.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//  	mail_forgot.send(JSON.stringify(data));
//  }
//
//
//
//
// function mail_forgot(username){
//   var error = "Username or Email Does not Exist";
//   var forgot = new XMLHttpRequest();
// 	forgot.onreadystatechange = function(){
// 		if (forgot.readyState == 4 && forgot.status == 200)
// 		{
// 			const bool = JSON.parse(forgot.responseText);
// 			console.log(bool);
// 			if(bool['check'] == "false")
// 				mail_forgot_send(bool);
// 			else
//       {
// 				changetext(error,document.getElementById('message'),"red", null);
//       }
// 		}
// 	};
// 	const data = {
// 		t_username : username
// 	};
// 	forgot.open("POST","ajax/forgot_password.php",true);
//   forgot.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 	forgot.send(JSON.stringify(data));
// }
//

password.addEventListener('blur', function(ev){
  var passregexp = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.).*$", "g");
  if (passregexp.test(password.value) === true && password.value.length >= 8)
    allgreen(password);
  else
  {
    var error = "Password : 8 character, 1 uppercase & 1 number";
    changetext(error,message,"red",message.innerHTML);
    allred(password);
    // errorpopup(password,popup, error);
  }
  if (password_check.value.length === 0)
    recovery(password);
}, true);

password_check.addEventListener('input', function(ev){
  if (password_check.value.localeCompare(password.value) === 0)
    allgreen(password_check);
  else
    allred(password_check);

  if (password_check.value.length === 0)
    recovery(password_check);
}, true);

submit.addEventListener('click',function(ev){
	var formfill = "Password : 8 character, 1 uppercase & 1 number";
	if(password.value.length === 0 || password_check.value.length === 0 )
	{
		changetext(formfill,message,"red",message.innerHTML);
		return;
	}
	// else
	// 	mail_forgot(username.value);
},true);
