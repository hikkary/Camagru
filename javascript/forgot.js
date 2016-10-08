 var username = document.getElementById('username');
 var submit = document.getElementById('submit');
 var message = document.getElementById('message');

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

 function mail_forgot_send(data){
   var error = "An error Occured";
   var mail_forgot = new XMLHttpRequest();
 	mail_forgot.onreadystatechange = function(){
 		if (mail_forgot.readyState == 4 && mail_forgot.status == 200)
 		{
 			const bool = JSON.parse(mail_forgot.responseText);
 			if(bool == "false")
      {
        alert('mail sent ! ')
      }
      else
       {
 				changetext(error,document.getElementById('message'),"red", null);
       }
 		}
 	};
 	mail_forgot.open("POST","ajax/forgot_mail.php",true);
  mail_forgot.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 	mail_forgot.send(JSON.stringify(data));
 }

function mail_forgot(username){
  var error = "Username or Email Does not Exist";
  var forgot = new XMLHttpRequest();
	forgot.onreadystatechange = function(){
		if (forgot.readyState == 4 && forgot.status == 200)
		{
			const bool = JSON.parse(forgot.responseText);
			// console.log(bool);
			if(bool['check'] == "false")
				mail_forgot_send(bool);
			else
      {
				changetext(error,document.getElementById('message'),"red", null);
      }
		}
	};
	const data = {
		t_username : username
	};
	forgot.open("POST","ajax/forgot_password.php",true);
  forgot.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	forgot.send(JSON.stringify(data));
}

submit.addEventListener('click',function(ev){
	var formfill = "Please write Username or Email";
	if(username.value.length === 0)
	{
		changetext(formfill,message,"red",message.innerHTML);
		return;
	}
	else
		mail_forgot(username.value);
},true);
