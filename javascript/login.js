 var username = document.getElementById('username');
 var password = document.getElementById('password');
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

function connect(username,password){
  var error = "Wrong Username or Password";
  var connect = new XMLHttpRequest();
	connect.onreadystatechange = function(){
		if (connect.readyState == 4 && connect.status == 200)
		{
			const bool = JSON.parse(connect.responseText);
			if(bool === "false")
				window.location.href = "app.php";
			else if (bool === "confirm") {
        changetext("Please Confirm Your Email To Connect",document.getElementById('message'),"red", null);
			}
      else
      {
				changetext(error,document.getElementById('message'),"red", null);
      }
		}
	};
	const data = {
		t_username : username,
		t_password : password
	};
	connect.open("POST","ajax/connect.php",true);
    connect.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	connect.send(JSON.stringify(data));
}



submit.addEventListener('click',function(ev){
	var formfill = "Please fill Username and Password";
	if(username.value.length === 0 || password.value.length === 0)
	{
		changetext(formfill,message,"red",message.innerHTML);
		return;
	}
	else
		connect(username.value,password.value);
},true);
