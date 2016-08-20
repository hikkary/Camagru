(function(){

 var nombre_masque = document.images;
 var i;
 var y = 1;
 // console.log("m"+y)
 for (var i = 3; i < nombre_masque.length; i++) {
 		console.log(nombre_masque[i].id)
 		document.getElementById("m"+y).style.heigth = "100px";
 		document.getElementById("m"+y).style.width = "100px";
 		y++;	
}



})();