(function(){

 var nombre_masque = document.images;
 var i;
 var y = 1;
  console.log("m"+y)
 for (var i = 1; i < nombre_masque.length; i++) {
 		console.log(nombre_masque[i].id)
 		document.getElementById("m"+y).style.heigth = "100px";
 		document.getElementById("m"+y).style.width = "100px";
 		document.getElementById("m"+y).addEventListener('click', function(ev){
 			tocanvas("m"+y);
},true)
 		y++;
}


  function tocanvas(id_masque){
  	console.log(id_masque);
    var masque = document.getElementById(id_masque);
    var canvas = document.querySelector("#mask");
    var contextmask = canvas.getContext("2d");
    contextmask.drawImage(masque,360,220);
}

// nombre_masque.addEventListener('click', function(ev){
// 	alert('ntm');
// },true)


})();
