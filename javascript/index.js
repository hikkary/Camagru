(function(){
	var email = document.getElementById('email');
	var username = document.getElementById('username');
	var first_name = document.getElementById('first_name');
	var last_name = document.getElementById('last_name');
	var password = document.getElementById('password');
	var submit = document.getElementById('sub');

	function alreadyused(elem)
	{
		var tmp = elem.value;

		elem.style.color="red";
		elem.style.border="none";
		elem.style.boxShadow="1px 1px 5px red";
		elem.value="X Already used";
		setTimeout(function() {
		elem.value = tmp;	
		}, 2000);
	}

	function Available(elem)
	{
		var tmp = elem.value;

		elem.style.color="green";
		elem.style.border="none";
		elem.style.boxShadow="1px 1px 5px green";
		elem.value="V Available";
		setTimeout(function() {
		elem.value = tmp;	
		}, 2000);
	}

	function checkemail(mail,email){
		var mail_check = new XMLHttpRequest();
		mail_check.onreadystatechange = function(){
			if (mail_check.readyState == 4 && mail_check.status == 200)
			{
				const bool = JSON.parse(mail_check.responseText);
				console.log(bool);
				if (bool == "true")
					alreadyused(email);
				else
					Available(email);
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
			checkemail(email.value,email);
	}, true);
})();