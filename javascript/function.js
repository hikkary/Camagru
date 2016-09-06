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

function recovery(elem,color)
{
  elem.style.color = color;
  elem.style.border= "";
  elem.style.boxShadow="";
  elem.verif = 0;
}

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

function regex_password(password)
{
   var passregexp = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.).*$", "g")
   if (passregexp.test(password.value) === true && password.value.length >= 8)
       return true;
   else {
       return false;
   }
}

function password_compare(password, password_check)
{
   if (password_check.value.localeCompare(password.value) === 0)
     return true;
   else {
     return false;
   }

}
