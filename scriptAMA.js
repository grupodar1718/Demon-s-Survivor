var pjImage = new Image();
pjImage.src = "Spritesheet.png";

var fondoImg = new Image();
fondoImg.src = "Mapa Prueba.jpg";

function sprite (options) {
  var that = {},
      frameIndex = 0,
      tickCount = 0,
      ticksPerFrame = 3,
      numberOfFramesX = options.numberOfFramesX || 9,
      numberOfFramesY = options.numberOfFramesY || 4;
  
  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.xPos = options.xPos;
  that.yPos = options.yPos;
  that.xSpeed = options.xSpeed;
  that.ySpeed = options.ySpeed;
  that.dir = options.dir;
  that.stop = options.stop;
  that.image = options.image;

  that.render = function (){
    that.context.clearRect(0, 0, 600, 400);
    
    that.context.drawImage(
      that.image,
      frameIndex * that.width / numberOfFramesX,    //xPos en la imagen
      that.dir * that.height / numberOfFramesY,   //yPos en la imagen
      that.width / numberOfFramesX,   //width en la imagen
      that.height / numberOfFramesY,  //height en la imagen
      that.xPos,  //xPos en el canvas
      that.yPos,  //yPos en el canvas
      50,    //Animation width
      50);   //Animation height
  };
  
  
  that.update = function () {
    tickCount += 1;
    
    if(tickCount > ticksPerFrame){
      tickCount = 0;
      
      if(frameIndex < numberOfFramesX - 1){
        frameIndex += 1;
      }else{
        frameIndex = 0;
      }
      
    }
    
  };


  
  return that;
}

var canvas = document.getElementById("pjAnimation");
canvas.width = 1152;
canvas.height = 318;

var background = document.getElementById("fondo");
var BG = background.getContext("2d");
BG.drawImage(fondoImg, 1152, 318);

var pj = sprite ({
  context: canvas.getContext("2d"),
  width: 450,
  height: 256,
  xPos: 0,
  yPos: 0,
  xSpeed: 0,
  ySpeed: 0,
  dir: 0,
  stop: true,
  numberOfFramesX: 9,
  numberOfFramesY:4,
  image: pjImage
});

function gameLoop () {
  window.requestAnimationFrame(gameLoop);
  if (pj.stop == false) {
    pj.xPos += pj.xSpeed;
    pj.yPos += pj.ySpeed;
    pj.update();
    pj.render();
  }
}

function move(e){

  if(e.keyCode==39 && pj.xPos<550){
    pj.xSpeed = 3;
    pj.dir = 2;
  }
  if(e.keyCode==37 && pj.xPos>0){
    pj.xSpeed = -3;
    pj.dir = 1;
  }
  if(e.keyCode==40 && pj.yPos<350){
    pj.ySpeed = 3;
    pj.dir = 0
  }
  if(e.keyCode==38 && pj.yPos>0){
    pj.ySpeed = -3;
    pj.dir = 3;
  }

  pj.stop = false;
}

function stop(){
  pj.stop = true;
  pj.frameIndex = 0;
  pj.xSpeed = 0;
  pj.ySpeed = 0;
  pj.render();
}

document.onkeydown = move;
document.onkeyup = stop;

pjImage.addEventListener("load", gameLoop);
