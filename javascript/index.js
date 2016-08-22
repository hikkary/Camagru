(function(){
	var email = document.getElementById('email');
	var username = document.getElementById('username');
	var first_name = document.getElementById('first_name');
	var last_name = document.getElementById('last_name');
	var password = document.getElementById('password');
	var submit = document.getElementById('sub');

	function checkemail(mail){
		var mail_check = new XMLHttpRequest();
		mail_check.onreadystatechange = function(){
			if (mail_check.readyState == 4 && mail_check.status == 200)
			{
				const bool = JSON.parse(mail_check.responseText);
				console.log(bool);
				if (bool == "true")
					alert('This mail is already on use');
				else
					alert("sisi la famine");
			}
		};
		const data = {
			email : mail
		}
		mail_check.open("POST", "ajax/form.php", true);
    	mail_check.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	mail_check.send(JSON.stringify(data));
    	console.log('zebi');
	};

	email.addEventListener('blur', function(ev){
		if (email.value)
			checkemail(email.value);
	}, true);
})();