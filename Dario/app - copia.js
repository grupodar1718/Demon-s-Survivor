console.log("Your fucker mother in the shower");
var context;
let game;
var tpad = document.getElementById('controller');
console.log(tpad);
class Personaje {
	
	constructor(x,y,color){
		this.x = x;
		this.y = y;
		this.color = color;
	}
	
	draw(context) {		
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, 50, 50);		
	}
}

class Game {

	constructor(){
		this.fps = 30;
		this.nextFrame = null;
		this.interval = null;
		this.direction = 'none';
		this.gridSize = 10;
		this.skipTicks = 1000 / this.fps;
		this.nextGameTick = (new Date).getTime();
		this.rect = new Personaje (5,5,"black");
	}

	initialize() {	
	
		var canvas = document.getElementById('playground');

		if (!canvas.getContext) {
			console.log('Error: 2d canvas not supported by this browser.');
			return;
		}
		
		context = canvas.getContext('2d');
		canvas.style.backgroundColor = "red";
		//var rect = new Personaje(20, 20, "black");
		this.rect.draw(context);
		//var rect = context.fillRect(10,10,30,30);
		//document.getElementById("playground").style.backgroundColor = "lightblue";
		window.addEventListener('keydown', e => {
			
			var code = e.keyCode;
			if (code > 36 && code < 41) {
				switch (code) {
				case 37: //flecha izquierda
					this.rect.x -=5;
					break;
				case 38: //flecha abajo
					this.rect.y -=5;
					break;
				case 39: //flecha derecha
					this.rect.x +=5;
					break;
				case 40: //flecha arriba
					this.rect.y +=5;
					break;
				}
			}
		}, false);
		
	}

	setDirection(direction) {
		
		this.direction = direction;
	}

	startGameLoop() {
		
		this.nextFrame = () => {
			requestAnimationFrame(() => this.run());
		}	
		this.nextFrame();		
	}

	stopGameLoop() {
		
		this.nextFrame = null;
		if (this.interval != null) {
			clearInterval(this.interval);
		}
	}

	draw() {
		
		//if(!finalizado){
		context.clearRect(0, 0, 800, 800);
		/*for (var id in this.snakes) {			
			this.snakes[id].draw(this.context);		
		}*/		
		//rect.draw(this.context);	
		this.rect.draw(context);
					
	}

	run() {
	
		while ((new Date).getTime() > this.nextGameTick) {
			this.nextGameTick += this.skipTicks;
			//console.log("Entra en GLOOP");
		}
		
		this.draw();
		if (this.nextFrame != null) {
			this.nextFrame();
		}
	}
	



}

game = new Game();
game.initialize();
game.startGameLoop()