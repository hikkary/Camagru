(function(){
	var email = document.getElementById('email');
	var username = document.getElementById('username');
	var first_name = document.getElementById('first_name');
	var last_name = document.getElementById('last_name');
	var password = document.getElementById('password');
	var submit = document.getElementById('sub');
	var popup = document.getElementById('ptext');

	function recovery(elem)
	{
		elem.style.color = " #00beff";
		elem.style.border= "";
		elem.style.boxShadow="";

	}

	// function apparition(popup)
	// {
	// 	var opacit = 0;

	// 	while (opacit <= 100)
	// 	{
	// 			popup.style.opacity = opacit;
	// 			opacit++;
			
	// 	}
	// }

	function errorpopup(elem, popup, error)
	{
		elem.style.color="red";
		elem.style.border="none";
		elem.style.boxShadow="1px 1px 5px red";
		popup.innerHTML= error;
		popup.style.color="red";
		popup.style.display ="inherit";
		popup.style.transition = "opacity 2s linear";
		popup.style.opacity= 100;
		// setTimeout(function() {
		// popup.style.opacity= 0;		
		// }, 5000);
		setTimeout(function() {
		// popup.style.display="none";
		popup.innerHTML=" ";
		}, 7000);
	}

	function allgreen(elem)
	{
		// var tmp = elem.value;

		elem.style.color="green";
		elem.style.border="none";
		elem.style.boxShadow="1px 1px 5px green";
	}



	// }


	function checkemailpattern(mail,email){
		var verif;
		var mail_check = new XMLHttpRequest();
		mail_check.onreadystatechange = function(){
			if (mail_check.readyState == 4 && mail_check.status == 200)
			{
				const bool = JSON.parse(mail_check.responseText);
				console.log(bool);
				if (bool == "true")
				{
					alertamalibu(email);
					verif = "true";
					return(verif);
				}
				else
				{
					lenghtok(email);
					verif = "false";
					return(verif);
				}
			}
		};
		const data = {
			email : mail
		}
		mail_check.open("POST", "ajax/mailpatterncheck.php", true);
    	mail_check.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	mail_check.send(JSON.stringify(data));
    	console.log('zebi');
	};

	function checkemail(mail,email, popup){
		var mail_check = new XMLHttpRequest();
		mail_check.onreadystatechange = function(){
			if (mail_check.readyState == 4 && mail_check.status == 200)
			{
				const bool = JSON.parse(mail_check.responseText);
				console.log(bool);
				if (bool == "true")
					alreadyused(email,popup);
				else
					Available(email);
			}
		};
		const data = {
			email : mail
		}
		mail_check.open("POST", "ajax/mailcheck.php", true);
    	mail_check.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	mail_check.send(JSON.stringify(data));
    	console.log('zebi');
	};

	function checkusername(uservalue,username, popup){
		var user_check = new XMLHttpRequest();
		user_check.onreadystatechange = function(){
			if (user_check.readyState == 4 && user_check.status == 200)
			{
				const bool = JSON.parse(user_check.responseText);
				if (bool == "true")
				{
					var error = "Username Already Used";
					errorpopup(username, popup, error);
				}
				else
					allgreen(username);
			}
		};
		const data = {
			username : uservalue
		}
		user_check.open("POST", "ajax/usercheck.php", true);
    	user_check.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	user_check.send(JSON.stringify(data));
	};

	function checklength(value,variable,popup){
		var length_check = new XMLHttpRequest();
		length_check.onreadystatechange = function(){
			if (length_check.readyState == 4 && length_check.status == 200)
			{
				const bool = JSON.parse(length_check.responseText);
				// console.log(bool);
				if (bool == "true")
				{
					var error = "X it's too short/Long"
					errorpopup(variable,popup, error);
				}
				else
					allgreen(variable);
			}
		};
		const data = {
			string : value
		}
		length_check.open("POST", "ajax/lenghtcheck.php", true);
    	length_check.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	length_check.send(JSON.stringify(data));
    	// console.log('zebi');
	};

	email.addEventListener('blur', function(ev){
		if (email.value)
		{
			var check = checkemailpattern(email.value,email); 
			console.log('nani o mienai ?')

			console.log(check);
			if (check == true)
			{
				console.log('nani o mienai ?')
				 return;
			}
		// 	else
		// 		checkemail(email.value,email);
		}
		else
			recovery(email);
	}, true);

	username.addEventListener('blur', function(ev){
		if (username.value)
			checkusername(username.value,username, popup);
		else
			recovery(username);
	}, true);

	first_name.addEventListener('blur', function(ev){
		if (first_name.value)
			checklength(first_name.value,first_name,popup);
		else
			recovery(first_name);
	}, true);

	last_name.addEventListener('blur', function(ev){
		if (last_name.value)
			checklength(last_name.value,last_name, popup);
		else
			recovery(last_name);
	}, true);

})();


	// function lenghtok(elem)
	// {
	// 	// var tmp = elem.value;

	// 	elem.style.color="green";
	// 	elem.style.border="none";
	// 	elem.style.boxShadow="1px 1px 5px green";
	// }

	// function alreadyused(elem, popup)
	// {
	// 	var tmp = elem.value;

	// 	elem.style.color="red";
	// 	elem.style.border="none";
	// 	elem.style.boxShadow="1px 1px 5px red";
	// 	popup.innerHTML="X Already Used ";
	// 	popup.style.color="red";
	// 	popup.style.display ="inherit";
	// 	popup.style.transition = "opacity 2s linear";
	// 	popup.style.opacity= 100;
	// 	// setTimeout(function() {
	// 	// popup.style.opacity= 0;		
	// 	// }, 5000);
	// 	setTimeout(function() {
	// 	// popup.style.display="none";
	// 	popup.innerHTML=" ";
	// 	}, 7000);
	// }

	// function Available(elem)
	// {
	// 	var tmp = elem.value;

	// 	elem.style.color="green";
	// 	elem.style.border="none";
	// 	elem.style.boxShadow="1px 1px 5px green";
	// 	elem.value="V Available";
	// 	setTimeout(function() {
	// 	elem.value = tmp;	
	// 	}, 500);
	// }

	// function Unvalidemail(elem)
	// {
	// 	var tmp = elem.value;

	// 	elem.style.color="red";
	// 	elem.style.border="none";
	// 	elem.style.boxShadow="1px 1px 5px red";
	// 	elem.value="Please enter a valid mail";
	// 	setTimeout(function() {
	// 	elem.value = tmp;	
	// 	}, 500);
