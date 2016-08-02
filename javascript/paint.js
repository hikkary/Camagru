function draw(){
	var canvas   = document.querySelector('#canvas')
	var context = canvas.getContext('2d');

	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(100,100);
	context.fill();
	
	canvas.style.backgroundColor ="blue";
	}
	//trouver le moyen de faire un dessin
	canvas.addEventListener('click', function(ev){
		draw();
},false);