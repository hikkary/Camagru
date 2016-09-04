 var username = document.getElementById('username');
 var password = document.getElementById('password');
 var submit = document.getElementById('submit')
 var message = document.getElementById('message');


function connect(username,password){
	var connect = new XMLHttpRequest();
	connect.onreadystatechange = function(){
		if (connect.readyState == 4 && connect.status == 200)
		{
			const bool = JSON.parse(connect.responseText);
			console.log(bool);
			if(bool == "true")
				window.location.href = "app.php";
			else
				alert("error");
		}
	};
	const data = {
		t_username : username,
		t_password : password
	}
	connect.open("POST","ajax/connect.php",true);
    connect.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	connect.send(JSON.stringify(data));
}

function changetext(message,element,color,original_message)
{
	element.innerHTML = message;
	element.style.color = color;
	if(original_message)
	{
		setTimeout(function(){
			changetext(original_message,element,"black", null)
		},3000);
	}
}

submit.addEventListener('click',function(ev){
	var formfill = "Please fill Username and Password";
	if(username.value.length == 0 || password.value.length == 0)
	{
		changetext(formfill,message,"red",message.innerHTML);
		return;
	}
	else
		alert('ok');
},true);
