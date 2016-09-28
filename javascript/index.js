(function(){
	var email = document.getElementById('email');
	var username = document.getElementById('username');
	var first_name = document.getElementById('first_name');
	var last_name = document.getElementById('last_name');
	var password = document.getElementById('password');
	var password_check = document.getElementById('password_check');
	var submit = document.getElementById('sub');
	var popup = document.getElementById('ptext');

	email.verif = 0;
	username.verif = 0;
	first_name.verif = 0;
	last_name.verif = 0;
	password.verif = 0;
	password_check.verif= 0;

	function empty_form(email,username,first_name,last_name,password,password_check)
	{
		email.value = "";
		username.value = "";
		first_name.value = "";
		last_name.value = "";
		password.value = "";
		password_check.value = "";
	}

	function hide_form()
	{
		document.getElementById('hero').style.display = "none";
		document.getElementById('ptext').style.display = "none";
		document.getElementById('email').style.display = "none";
		document.getElementById('username').style.display = "none";
		document.getElementById('first_name').style.display = "none";
		document.getElementById('last_name').style.display = "none";
		document.getElementById('password').style.display = "none";
		document.getElementById('password_check').style.display = "none";
		document.getElementById('sub').style.display = "none";
		document.getElementById('redirect').style.display = "inherit";
	}


	empty_form(email, username,first_name,last_name,password,password_check);

function send_form(mail, username, random) {
    var mail_check = new XMLHttpRequest();
    mail_check.onreadystatechange = function() {
        if (mail_check.readyState == 4 && mail_check.status == 200) {
            const bool = JSON.parse(mail_check.responseText);
            console.log(bool);
            if (bool == "true") {
                // alert('non non non non non');
                return;
            }
        	}
				};
        const data = {
            email: mail,
            uname: username,
            rkey: random
        };
        mail_check.open("POST", "ajax/mailsend.php", true);
        mail_check.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        mail_check.send(JSON.stringify(data));
      }


	function submit_form(email, username, first_name, last_name, password) {
	    var random = Math.floor((Math.random() * 899999) + 100000);
	    var form = new XMLHttpRequest();
	    form.onreadystatechange = function(data) {
	        if (form.readyState == 4 && form.status == 200) {
	            const bool = JSON.parse(form.responseText);
	            console.log(bool);
	            if (bool == "true") {
	                var error = "An error occured";
	                errorpopup(email, popup, error);
	            } else {
	                hide_form();
	                send_form(email, username, random);
	            }
	        }
	    };
	    const data = {
	        t_email: email,
	        t_username: username,
	        t_first_name: first_name,
	        t_last_name: last_name,
	        t_password: password,
	        t_random: random
	    };
	    form.open("POST", "ajax/add_user.php", true);
	    form.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    form.send(JSON.stringify(data));
	}

	function recovery(elem)
	{
		elem.style.color = " #00beff";
		elem.style.border= "";
		elem.style.boxShadow="";
		elem.verif = 0;
	}

	function errorpopup(elem, popup, error)
	{
		elem.verif = 0;
		elem.style.color="red";
		elem.style.border="none";
		elem.style.boxShadow="1px 1px 5px red";
		popup.innerHTML= error;
		popup.style.heigth = "60px";
		popup.style.color="red";
		popup.style.display ="inherit";
		popup.style.transition = "opacity 2s linear";
		popup.style.opacity= "100";
		setTimeout(function() {
		popup.style.opacity= 0;
		}, 5000);
		setTimeout(function() {
		popup.style.display="none";
		popup.style.heigth = "0px";
		popup.innerHTML=" ";
		}, 7000);

	}

	function allgreen(elem)
	{
		elem.style.color="green";
		elem.style.border="none";
		elem.style.boxShadow="1px 1px 5px green";
		elem.verif = 1;
	}

	function allred(elem)
	{
		elem.style.color="red";
		elem.style.border="none";
		elem.style.boxShadow="1px 1px 5px red";
		elem.verif = 0;
	}


	function checkemail(mail,email, popup){
		var mail_check = new XMLHttpRequest();
		mail_check.onreadystatechange = function(){
			if (mail_check.readyState == 4 && mail_check.status == 200)
			{
				const bool = JSON.parse(mail_check.responseText);
				console.log(bool);
				if (bool == "true"){
					var error = "X Mail Already	Used";
					errorpopup(email,popup, error);
					return;
				}
				else
					allgreen(email);
			}
		};
		const data = {
			email : mail
		};
		mail_check.open("POST", "ajax/mailcheck.php", true);
    	mail_check.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	mail_check.send(JSON.stringify(data));
    	console.log('zebi');
	}


	function checkemailpattern(mail,email, popup){
		var mail_check = new XMLHttpRequest();
		mail_check.onreadystatechange = function(){
			if (mail_check.readyState == 4 && mail_check.status == 200)
			{
				const bool = JSON.parse(mail_check.responseText);
				console.log(bool);
				if (bool == "true")
				{
					var error = " X Unvalid Mail";
					errorpopup(email, popup, error);
				}
				else
					checkemail(mail,email,popup);
			}
		};
		const data = {
			email : mail
		};
		mail_check.open("POST", "ajax/mailpatterncheck.php", true);
    	mail_check.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	mail_check.send(JSON.stringify(data));
    	// console.log('zebi');
	}

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
		};
		user_check.open("POST", "ajax/usercheck.php", true);
    	user_check.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	user_check.send(JSON.stringify(data));
	}

	function checklength(value,variable,popup){
		var length_check = new XMLHttpRequest();
		length_check.onreadystatechange = function(){
			if (length_check.readyState == 4 && length_check.status == 200)
			{
				const bool = JSON.parse(length_check.responseText);
				// console.log(bool);
				if (bool == "true")
				{
					var error = "X it's too short/Long";
					errorpopup(variable,popup, error);
				}
				else
					allgreen(variable);
			}
		};
		const data = {
			string : value
		};
		length_check.open("POST", "ajax/lenghtcheck.php", true);
    	length_check.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	length_check.send(JSON.stringify(data));
    	// console.log('zebi');
	}

	email.addEventListener('blur', function(ev){
		if (email.value)
			checkemailpattern(email.value,email,popup);
		else
			recovery(email);
		// console.log(check);

	}, true);

	username.addEventListener('blur', function(ev){
		var username_regex = new RegExp("^[a-zA-Z0-9\-]*$", "g");
		if ((username.value.length < 5 || username.value.length >= 60) && username.value.length !== 0  || username_regex.test(username.value) === false)
		{
			var error = "X Username Must be at least 5 alphabetical characters ";
			errorpopup(username, popup, error);
		}
		else if (username.value.length >= 5 && username.value.length <= 60)
			checkusername(username.value,username, popup);
		else
			recovery(username);
	}, true);

	first_name.addEventListener('blur', function(ev){
		var first_name_regex = new RegExp("^[a-zA-Z\-]*$", "g");
		if ((first_name.value.length >= 2 && first_name.value.length <= 60) && first_name_regex.test(first_name.value) === true)
			allgreen(first_name);
		else if (first_name.value.length === 0)
			recovery(first_name);
		else {
			var error = "X Must be at least 2 alphabetical characters";
			// allred(first_name);
			errorpopup(first_name, popup, error);
		}
	}, true);

	last_name.addEventListener('blur', function(ev){
		var last_name_regex = new RegExp("^[a-zA-Z\-]*$", "g");
		if ((last_name.value.length >= 2 && last_name.value.length <= 60) && last_name_regex.test(last_name.value) === true)
			allgreen(last_name);
		else if (last_name.value.length === 0)
			recovery(last_name);
		else {
			var error = "X Must be at least 2 alphabetical characters";
			// allred(last_name);
			errorpopup(last_name, popup, error);
		}
	}, true);

	password.addEventListener('blur', function(ev){
		var passregexp = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.).*$", "g");
		if (passregexp.test(password.value) === true && password.value.length >= 8)
			allgreen(password);
		else
		{
			var error = "Must contain at least 8 character, 1 uppercase and 1 number";
			errorpopup(password,popup, error);
		}

		if (password.value.length === 0)
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


	// function verifcheck(first_name,last_name,email,username,password,password_check){
	// 	if (first_name.verif == 0 || last_name.verif == 0 || email.verif ==0 ||	username.verif == 0 || password.verif == 0 || password_check.verif == 0)
	// 		return false;
	// 	else
	// 		return true;

	// }


	submit.addEventListener('click', function(ev){
		var error = "Please fill correctly all the form";
		// checkemailpattern(email.value,email,popup);
		if ((username.value.length < 5 || username.value.length >= 60) && username.value.length !== 0)
			errorpopup(username, popup, error);
		else if (username.value.length >= 5 && username.value.length <= 60)
			checkusername(username.value,username, popup);
		 // checkusername(username.value,username, popup);

		// console.log(first_name.verif);
		// console.log(last_name.verif);
		// console.log(email.verif);
		// console.log(username.verif);
		// console.log(password.verif);
		// console.log(password_check.verif);


		if(first_name.value.length === 0 || first_name.style.color == "red" || first_name.verif === 0)
		{
			errorpopup(first_name,popup,error);
			return;
		}
		if(last_name.value.length === 0 || last_name.style.color == "red" || last_name.verif === 0)
		{
			errorpopup(last_name,popup,error);
			return;
		}
		if(email.value.length === 0 || email.style.color == "red" || email.verif === 0)
		{
			errorpopup(email,popup,error);
			return;
		}
		if(username.value.length === 0 || username.style.color == "red" || username.verif === 0)
		{
			errorpopup(username,popup,error);
			return;
		}
		if(password.value.length === 0 || password.style.color == "red" || password.verif === 0)
		{
			errorpopup(password,popup,error);
			return;
		}
		if(password_check.value.length === 0 || password_check.style.color == "red" || password_check.verif === 0)
		{
			errorpopup(password_check,popup,error);
			return;
		}
		// if (verifcheck(first_name,last_name,email,username,password,password_check) == true)
				submit_form(email.value,username.value,first_name.value,last_name.value,password.value);
		// else
			// return;
	}, true);
}());
