
//////////////////////////////////////////////////////////////INICIALIZACIÓN DE VARIABLES

var pjImg = new Image();
pjImg.src = "Sprites/Prota.png";

var pjShieldImg = new Image();
pjShieldImg.src = "Sprites/ProtaShield.png";

var skeletonImg = new Image();
skeletonImg.src = "Sprites/Skeleton.png";

var vampireImg = new Image();
vampireImg.src = "Sprites/Vampire.png";

var demonImg = new Image();
demonImg.src = "Sprites/Demon.png";

var fireMobImg = new Image();
fireMobImg.src = "Sprites/Firemob.png";

var fireImg = new Image();
fireImg.src = "Sprites/Fire.png";

var coinImg = new Image();
coinImg.src = "Sprites/Coin.png";

var bootImg = new Image();
bootImg.src = "Sprites/Boots.png";

var shieldImg = new Image();
shieldImg.src = "Sprites/Shield.png";

var fondoImg = new Image();
fondoImg.src = "Interfaz/Mapa1.png";

var skeletons = [];
var vampires = [];
var demons = [];
var fireMobs = [];
var fires = [];
var coins = [];
var boots = [];
var shields = [];

var id = 0;
var speed = 3;
var shieldTimer = 5;
var shieldCollision = false;
var shieldActive = false;
var firstShield = false;

var playing = true;
var begin = false;
var lock = 0;

/////////////////////////////////////////////////////////////////////INICIALIZACIÓN DEL PROTOTIPO EL CUAL VAN A SEGUIR TODOS LOS PJS

function sprite (options) {
  var that = {},
      tickCount = 0,
      numberOfFramesX = options.numberOfFramesX || 9,
      numberOfFramesY = options.numberOfFramesY || 4;
  that.frameIndex = 1;
  that.ticksPerFrame = options.ticksPerFrame;
  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.imgWidth = options.imgWidth;
  that.imgHeight = options.imgHeight;
  that.xPos = options.xPos;
  that.yPos = options.yPos;
  that.xSpeed = options.xSpeed;
  that.ySpeed = options.ySpeed;
  that.dir = options.dir;
  that.stop = options.stop;
  that.image = options.image;
  that.count = options.count;
  that.lifes = 3;
  that.score = 0;

  ////////////////////////////////////////////////////////////////////////////FUNCIÓN QUE RENDERIZA CADA PJ

  that.render = function (){  
    if(numberOfFramesY > 1){
      that.context.drawImage(
      that.image,
      that.frameIndex * that.width / numberOfFramesX,    //xPos en la imagen
      that.dir * that.height / numberOfFramesY,   //yPos en la imagen
      that.width / numberOfFramesX,   //width en la imagen
      that.height / numberOfFramesY,  //height en la imagen
      that.xPos,  //xPos en el canvas
      that.yPos,  //yPos en el canvas
      50,    //Animation width
      50);   //Animation height
    }else{
      that.context.drawImage(
      that.image,
      that.frameIndex * that.width / numberOfFramesX,    //xPos en la imagen
      that.dir * that.height / numberOfFramesY,   //yPos en la imagen
      that.width / numberOfFramesX,   //width en la imagen
      that.height / numberOfFramesY,  //height en la imagen
      that.xPos,  //xPos en el canvas
      that.yPos,  //yPos en el canvas
      35,    //Animation width
      35);   //Animation height
    }
  };
  
  ////////////////////////////////////////////////////////////////////FUNCIÓN QUE CONTROLA LA VELOCIDAD CON QUE AVANZA LA ANIMACIÓN DEL SPRITE  
  
  that.update = function () {
    tickCount += 1;
    
    if(tickCount > that.ticksPerFrame){
      tickCount = 0;
      
      if(that.frameIndex < numberOfFramesX - 1 && that.stop == false){
        that.frameIndex += 1;
      }else{
        that.frameIndex = 1;
      }
    }
    
  };

  //////////////////////////////////////////////////////////COMPRUEBAN SI LOS PJS CONTROLADOS POR CPU PUEDEN SEGUIR AVANZANDO O MUEREN

  that.checkMove = function(){
    var die = false;

    if(that.xSpeed > 0){
      if (that.xPos > 750){
        die = true;
      }
    }else{
      if(that.xPos <3){
        die = true;
      }
    }
    if(that.ySpeed > 0){
      if (that.yPos >550){
        die = true;
      }
    }else{
      if(that.yPos <3){
        die = true;
      }
    }

    return die;
  };

  that.checkSkeleton = function(){
    var die = false;

    if(that.xSpeed > 0){
      if (that.xPos > 750){
        die = true;
      }
    }else{
      if(that.xPos <3){
        die = true;
      }
    }
    if(that.ySpeed > 0){
      if (that.yPos >550){
        die = true;
      }
    }else{
      if(that.yPos <3){
        die = true;
      }
    }

    return die;
  };

  that.checkDemon = function(){
    var die = false;
    if(that.xSpeed > 0){
      if (that.xPos > 750){
        that.xSpeed = -that.xSpeed;
      }
    }else{
      if(that.xPos <3){
        that.xSpeed = -that.xSpeed;
      }
    }

    if(that.ySpeed > 0){
      if (that.yPos >550){
        die = true;
      }
    }

    return die;
  };

  that.checkfireMob = function(){
    var die = false;

    if(that.xSpeed > 0){
      if (that.xPos > 750){
        die = true;
      }
    }else{
      if(that.xPos < 3){
        die = true;
      }
    }
    if(that.ySpeed > 0){
      if (that.yPos >550){
        die = true;
      }
    }else{
      if(that.yPos < 3){
        die = true;
      }
    }

   if(that.count == 50){
      that.count = 0;

      /////////////////////////////////////////////////CREACIÓN DE LOS FUEGOS QUE SIGUEN AL FIREMOB

      var firemob = {};
      firemob.id = id;
      firemob.image = fireImg;
      firemob.xPos = that.xPos;
      firemob.yPos = that.yPos;
      firemob.frameIndex = 0;
      firemob.tickCount = 0;
      firemob.life = function(){
        setTimeout(function(){
          for(var i = 0; i < fires.length; i++){
            if(fires[i].id == firemob.id)
              fires.splice(i, 1);
          }
        }, 4000);
      };

      firemob.life();

      id++;

      switch (that.dir){
        case 0:
          that.dir = 1;
          that.xSpeed = -1;
          that.ySpeed = 0;
          break;
        case 1:
          that.dir = 0;
          that.xSpeed = 0;
          that.ySpeed = 1;
          break;
        case 2:
          that.dir = 3;
          that.xSpeed = 0;
          that.ySpeed = -1;
          break;
        case 3:
          that.dir = 2;
          that.xSpeed = 1;
          that.ySpeed = 0;
          break;
      }
      fires.push(firemob);
      
    }

    return die;
  };

  return that;
}

///////////////////////////////////////////////////////////////////CREACIÓN DEL CANVAS

var canvas = document.getElementById("pjAnimation");
canvas.width = 800;
canvas.height = 600;

////////////////////////////////////////////////////////////////////DEFINICIÓN DEL PJ PRINCIPAL

var pj = sprite ({
  context: canvas.getContext("2d"),
  ticksPerFrame: 5,
  frameIndex: 1,
  width: 274,
  height: 365,
  xPos: 0,
  yPos: 0,
  xSpeed: 0,
  ySpeed: 0,
  dir: 0,
  stop: true,
  numberOfFramesX: 3,
  numberOfFramesY:4,
  image: pjImg
});

/////////////////////////////////////////////////////////////////////////GAME LOOP

function gameLoop () {

  window.requestAnimationFrame(gameLoop);

  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,800,600);
  ctx.drawImage(fondoImg, 0, 0);

  if(begin == true && lock == 0){
    beginGame();
    lock += 1;
  }
 
  if(playing == true){

    checkPosition(pj);
    for(var i = 0; i < skeletons.length; i++){
      if(skeletons[i] != null){
        checkPosition(skeletons[i]);
      }
    }
    for(var i = 0; i < vampires.length; i++){
      if(vampires[i] != null){
        checkPosition(vampires[i]);
      }
    }  
    for(var i = 0; i < demons.length; i++){
      if(demons[i] != null){
        checkPosition(demons[i]);
      }
    } 
    for(var i = 0; i < fireMobs.length; i++){
      if(fireMobs[i] != null){
        fireMobs[i].count += 1;
        checkPosition(fireMobs[i]);
      }
    }

    pj.update();
    pj.render();

    checkShields();
    checkBoots();
    checkCoins();
    checkFires();
    checkSkeletons();
    checkVampires();
    checkDemons();
    checkfireMobs();
    
  }
  
}

///////////////////////////////////////////////////////////////////////FUNCIONES DE CHEQUEO DE TODAS LAS COLISIONES ENTRE PJS Y EL MAPA

function checkPosition(pjs){
  if(pjs.xSpeed > 0 && pjs.xPos <= 750)
    pjs.xPos += pjs.xSpeed;
  if(pjs.xSpeed < 0 && pjs.xPos >= 3)
    pjs.xPos += pjs.xSpeed;
  if(pjs.ySpeed > 0 && pjs.yPos <= 550)
    pjs.yPos += pjs.ySpeed;
  if(pjs.ySpeed < 0 && pjs.yPos >= 3)
    pjs.yPos += pjs.ySpeed;
}

function checkSkeletons(){
	for(var i = 0; i < skeletons.length; i++){
	    if(skeletons[i] != null){
	      if(intersectRect(
	        pj.yPos + 5,
          pj.yPos + 45,
	        pj.xPos + 12,
	        pj.xPos + 38,
	        skeletons[i].yPos,
	        skeletons[i].yPos + 50,
	        skeletons[i].xPos + 10,
	        skeletons[i].xPos + 40 || skeletons[i] != null))
	      {
          if(pj.lifes == 0){
            endGame();
          }
          pj.image = pjImg;
          pj.lifes -= 1;
          shieldCollision = true;
          console.log("Lifes: "+pj.lifes);
	        skeletons.splice(i, 1);
	      }else if(skeletons[i] != null){
	        if(skeletons[i].checkSkeleton()==true){
            skeletons.splice(i, 1);
          }else{
  	        skeletons[i].update();
  	        skeletons[i].render();
          }
	      }
	    }
	}
}

function checkVampires(){
  for(var i = 0; i < vampires.length; i++){
      if(vampires[i] != null){
        if(intersectRect(
          pj.yPos + 5,
          pj.yPos + 45,
          pj.xPos + 12,
          pj.xPos + 38,
          vampires[i].yPos + 5,
          vampires[i].yPos + 45,
          vampires[i].xPos + 10,
          vampires[i].xPos + 40 || vampires[i] != null))
        {
          if(pj.lifes == 0){
            endGame();
          }
          pj.image = pjImg;
          pj.lifes -= 1;
          shieldCollision = true;
          console.log("Lifes: "+pj.lifes);
          vampires.splice(i, 1);
        }else if(vampires[i] != null){
          if(vampires[i].checkSkeleton()==true){
            vampires.splice(i, 1);
          }else{
            vampires[i].update();
            vampires[i].render();
          }
        }
      }
  }
}

function checkDemons(){
  for(var i = 0; i < demons.length; i++){
      if(demons[i] != null){
        if(intersectRect(
          pj.yPos + 5,
          pj.yPos + 45,
          pj.xPos + 12,
          pj.xPos + 38,
          demons[i].yPos + 5,
          demons[i].yPos + 45,
          demons[i].xPos + 10,
          demons[i].xPos + 40 || demons[i] != null))
        {
          if(pj.lifes == 0){
            endGame();
          }
          pj.image = pjImg;
          pj.lifes -= 1;
          shieldCollision = true;
          console.log("Lifes: "+pj.lifes);
          demons.splice(i, 1);
        }else if(demons[i] != null){
          if(demons[i].checkDemon()==true){
            demons.splice(i, 1);
          }else{
            demons[i].update();
            demons[i].render();
          }
        }
      }
  }
}

function checkfireMobs(){
  for(var i = 0; i < fireMobs.length; i++){
      if(fireMobs[i] != null){
        if(intersectRect(
          pj.yPos + 5,
          pj.yPos + 45,
          pj.xPos + 12,
          pj.xPos + 38,
          fireMobs[i].yPos + 7,
          fireMobs[i].yPos + 43,
          fireMobs[i].xPos + 15,
          fireMobs[i].xPos + 35 || fireMobs[i] != null))
        {
          if(pj.lifes == 0){
            endGame();
          }
          pj.image = pjImg;
          pj.lifes -= 1;
          shieldCollision = true;
          console.log("Lifes: "+pj.lifes);
          fireMobs.splice(i, 1);
        }else if(fireMobs[i] != null){
          if(fireMobs[i].checkfireMob()==true){
            fireMobs.splice(i, 1);
          }else{
            fireMobs[i].update();
            fireMobs[i].render();
          }
        }
      }
  }
}

function checkFires(){
  for(var i = 0; i < fires.length; i++){
      if(fires[i] != null){
        if(intersectRect(
          pj.yPos + 5,
          pj.yPos + 45,
          pj.xPos + 12,
          pj.xPos + 38,
          fires[i].yPos + 7,
          fires[i].yPos + 43,
          fires[i].xPos + 15,
          fires[i].xPos + 35 || fires[i] != null))
        {
          if(pj.lifes == 0){
            endGame();
          }
          shieldCollision = true;
          pj.image = pjImg;
          pj.lifes -= 1;
          console.log("Lifes: "+pj.lifes);
          fires.splice(i, 1);
        }else if(fires[i] != null){
          fires[i].tickCount += 1;
    
          if(fires[i].tickCount > 3){
            fires[i].tickCount = 0;
            
            if(fires[i].frameIndex < 4 - 1){
              fires[i].frameIndex += 1;
            }else{
              fires[i].frameIndex = 0;
            }
            
          }
          pj.context.drawImage(
          fires[i].image,
          0,    //xPos en la imagen
          fires[i].frameIndex * 365 / 4,   //yPos en la imagen
          91,   //width en la imagen
          365 / 4,  //height en la imagen
          fires[i].xPos,  //xPos en el canvas
          fires[i].yPos,  //yPos en el canvas
          50,    //Animation width
          50);   //Animation height
        }
      }
  }
}

function checkCoins(){
  for(var i = 0; i < coins.length; i++){
      if(coins[i] != null){
        if(intersectRect(
          pj.yPos + 5,
          pj.yPos + 45,
          pj.xPos + 12,
          pj.xPos + 38,
          coins[i].yPos,
          coins[i].yPos + 35,
          coins[i].xPos,
          coins[i].xPos + 35 || coins[i] != null))
        {
          pj.score += 20;
          console.log("Score: "+pj.score);
          coins.splice(i, 1);
        }else if(coins[i] != null){
          coins[i].update();
          coins[i].render();
        }
      }
  }
}

function checkBoots(){
  for(var i = 0; i < boots.length; i++){
      if(boots[i] != null){
        if(intersectRect(
          pj.yPos + 5,
          pj.yPos + 45,
          pj.xPos + 12,
          pj.xPos + 38,
          boots[i].yPos,
          boots[i].yPos + 35,
          boots[i].xPos + 7,
          boots[i].xPos + 28 || boots[i] != null))
        {
          speed = 5;
          setTimeout(function(){
            speed = 3;
          }, 5000);
          boots.splice(i, 1);
        }else if(boots[i] != null){
          boots[i].render();
        }
      }
  }
}

function checkShields(){
  for(var i = 0; i < shields.length; i++){
      if(shields[i] != null){
        if(intersectRect(
          pj.yPos + 5,
          pj.yPos + 45,
          pj.xPos + 12,
          pj.xPos + 38,
          shields[i].yPos,
          shields[i].yPos + 35,
          shields[i].xPos,
          shields[i].xPos + 35 || shields[i] != null))
        {
          if(shieldActive == false){
            pj.lifes++;
            pj.image = pjShieldImg;
          }
          shieldTimer = 5;
          shieldActive = true;
          if(shieldTimer == 5 && firstShield == false){
            firstShield = true;
            shieldTimeout();
          } 
          shields.splice(i, 1);
        }else if(shields[i] != null){
          shields[i].render();
        }
      }
  }
}

function shieldTimeout(){
  if(shieldActive == true){
    shieldTimer = shieldTimer -1;
    if(shieldTimer < 0 && shieldCollision == true){
      pj.image = pjImg;
      shieldActive = false;
      shieldCollision = false;
    }else if(shieldTimer < 0 && shieldCollision == false){
      pj.lifes--;
      pj.image = pjImg;
      shieldActive = false;
    }
  }
  setTimeout("shieldTimeout()", 1000);
}

////////////////////////////////////////////////////////////////////////////////////////////FUNCION DE CHEQUEO DE COLISIÓN ENTRE DOS SPRITES

function intersectRect(topA, bottomA, leftA, rightA, topB, bottomB, leftB, rightB) {
  return !(leftB > rightA || 
           rightB < leftA || 
           topB > bottomA ||
           bottomB < topA);
}

/////////////////////////////////////////////////////////////////////////////////////////////CREACION DE CADA PJS CON SUS ATRIBUTOS

function createSkeleton(){
  var skeleton = sprite({
    context: canvas.getContext("2d"),
    ticksPerFrame: 8,
    width: 274,
    height: 365,
    xPos: 0,
    yPos: 0,
    xSpeed: 0,
    ySpeed: 0,
    dir: Math.floor((Math.random() * 4)),
    stop: false,
    numberOfFramesX: 3,
    numberOfFramesY:4,
    image: skeletonImg
  });
  
  switch(skeleton.dir){
    case 0:
    	skeleton.xPos = Math.floor((Math.random() * 750));
    	skeleton.ySpeed = 1;
      break;
    case 1:
    	skeleton.xPos = 750;
    	skeleton.yPos = Math.floor((Math.random() * 550));
    	skeleton.xSpeed = -1;
      break;
    case 2:
    	skeleton.yPos = Math.floor((Math.random() * 550));
    	skeleton.xSpeed = 1;
      break;
    case 3:
    	skeleton.ypos = 550;
    	skeleton.xPos = Math.floor((Math.random() * 750));
    	skeleton.ySpeed = -1;
      break;      
  }
  skeletons.push(skeleton);
}

function createVampire(){
  var vampire = sprite({
    context: canvas.getContext("2d"),
    ticksPerFrame: 4,
    width: 274,
    height: 365,
    xPos: 0,
    yPos: 0,
    xSpeed: 0,
    ySpeed: 0,
    dir: Math.floor((Math.random() * 4)),
    stop: false,
    numberOfFramesX: 3,
    numberOfFramesY:4,
    image: vampireImg
  });
  
  switch(vampire.dir){
    case 0:
      vampire.xPos = Math.floor((Math.random() * 750));
      vampire.ySpeed = 4;
      break;
    case 1:
      vampire.xPos = 750;
      vampire.yPos = Math.floor((Math.random() * 550));
      vampire.xSpeed = -4;
      break;
    case 2:
      vampire.yPos = Math.floor((Math.random() * 550));
      vampire.xSpeed = 4;
      break;
    case 3:
      vampire.ypos = 550;
      vampire.xPos = Math.floor((Math.random() * 750));
      vampire.ySpeed = -4;
      break;      
  }
  vampires.push(vampire);
}

function createDemon(){
  var demon = sprite({
    context: canvas.getContext("2d"),
    ticksPerFrame: 4,
    width: 274,
    height: 365,
    xPos: 0,
    yPos: 0,
    xSpeed: 0,
    ySpeed: 0,
    dir: 0,
    stop: false,
    numberOfFramesX: 3,
    numberOfFramesY:4,
    image: demonImg,
  });
  
  demon.ySpeed = 1.5;
  demon.xSpeed = 1.5;
  demon.xPos = Math.floor((Math.random() * 750));

  setInterval(function() {
    demon.xSpeed = -demon.xSpeed;
  }, 2500);

  demons.push(demon);
}

function createfireMob(){
  var fireMob = sprite({
    context: canvas.getContext("2d"),
    ticksPerFrame: 4,
    width: 274,
    height: 365,
    xPos: 0,
    yPos: 0,
    xSpeed: 0,
    ySpeed: 0,
    dir: Math.floor((Math.random() * 4)),
    stop: false,
    numberOfFramesX: 3,
    numberOfFramesY:4,
    image: fireMobImg,
    count: 49
  });
  
  switch(fireMob.dir){
    case 0:
      fireMob.xPos = Math.floor((Math.random() * 750));
      fireMob.yPos = 3;
      fireMob.ySpeed = 1;
      break;
    case 1:
      fireMob.xPos = 750;
      fireMob.yPos = Math.floor((Math.random() * 550));
      fireMob.xSpeed = -1;
      break;
    case 2:
      fireMob.yPos = Math.floor((Math.random() * 550));
      fireMob.xPos = 3;
      fireMob.xSpeed = 1;
      break;
    case 3:
      fireMob.ypos = 550;
      fireMob.xPos = Math.floor((Math.random() * 750));
      fireMob.ySpeed = -1;
      break;      
  }
  fireMobs.push(fireMob);
}

function createCoin(){
  var coin = sprite({
    context: canvas.getContext("2d"),
    ticksPerFrame: 4,
    width: 440,
    height: 40,
    xPos: Math.floor((Math.random() * 700) + 50),
    yPos: Math.floor((Math.random() * 500) + 50),
    dir: 0,
    stop: false,
    numberOfFramesX: 10,
    numberOfFramesY:1,
    image: coinImg
  });
  coin.frameIndex = 0;
  coins.push(coin);
}

function createBoot(){
  var boot = sprite({
    context: canvas.getContext("2d"),
    ticksPerFrame: 4,
    width: 200,
    height: 200,
    xPos: Math.floor((Math.random() * 700) + 50),
    yPos: Math.floor((Math.random() * 500) + 50),
    dir: 0,
    stop: false,
    numberOfFramesX: 1,
    numberOfFramesY:1,
    image: bootImg
  });
  boot.frameIndex = 0;
  boots.push(boot);
}

function createShield(){
  var shield = sprite({
    context: canvas.getContext("2d"),
    ticksPerFrame: 4,
    width: 175,
    height: 167,
    xPos: Math.floor((Math.random() * 700) + 50),
    yPos: Math.floor((Math.random() * 500) + 50),
    dir: 0,
    stop: false,
    numberOfFramesX: 1,
    numberOfFramesY:1,
    image: shieldImg
  });
  shield.frameIndex = 0;
  shields.push(shield);
}

///////////////////////////////////////////////////////FUNCIONES DE CONTROL DEL TECLADO

function move(e){

  if(e.keyCode==39 && pj.xPos<750){
    pj.xSpeed = speed;
    pj.dir = 2;
  }
  if(e.keyCode==37 && pj.xPos>0){
    pj.xSpeed = -speed;
    pj.dir = 1;
  }
  if(e.keyCode==40 && pj.yPos<550){
    pj.ySpeed = speed;
    pj.dir = 0;
  }
  if(e.keyCode==38 && pj.yPos>0){
    pj.ySpeed = -speed;
    pj.dir = 3;
  }

  pj.stop = false;
}


function stop(e){
  if(e.keyCode == 39 || e.keyCode == 37){

    pj.xSpeed = 0;
    if(pj.ySpeed > 0){
      pj.dir = 0;
    }else if(pj.ySpeed < 0){
      pj.dir = 3;
    }

  }

  if(e.keyCode == 40 || e.keyCode == 38){ 

    pj.ySpeed = 0;
    if(pj.xSpeed > 0){
      pj.dir = 2;
    }else if(pj.xSpeed < 0){
      pj.dir = 1;
    }

  }

  if(pj.xSpeed == 0 && pj.ySpeed == 0){
    pj.stop = true;
  } 
}

function endGame(){
  playing = false;
}

document.onkeydown = move;
document.onkeyup = stop;

pjImg.addEventListener("load", gameLoop);

/////////////////////////////////INTERVALOS DE CREACIÓN DE PJS

function beginGame(){
    setInterval(function() {
        createSkeleton();
    }, 500);

    setInterval(function() {
        createVampire();
    }, 2000);

    setInterval(function() {
        createDemon();
    }, 4000);

    setInterval(function() {
        createfireMob();
    }, 4000);

    setInterval(function() {
        createCoin();
    }, 5000);

    setInterval(function() {
        createBoot();
    }, 10000);

    setInterval(function() {
        createShield();
    }, 15000);

    countDown();
}

  ////////////////////////////////RELOJ

toHour=0;
toMinute=0;
toSecond=45;

function countDown(){
    toSecond=toSecond-1;
    if(toSecond<0)
    {
      toSecond=59;
      toMinute=toMinute-1;
    }

    console.log(toMinute+":"+toSecond);

    if(toSecond == 0 && toMinute == 0){
        playing = false;
        pj.score += 500;
    }else{
      setTimeout("countDown()",1000);
    }

  }

//INTERFAZ
$(document).ready(function(){
			
	var parameters = location.search.substring(1).split("&").toString();
	console.log(parameters);
	if(parameters ==="EN"){
		english();
	}				
	else{
		spanish();
	}

	function english(){
		$('#pausa').attr('src',"Interfaz/pause.png");
		$('#level').attr('src',"Interfaz/level1.png");
		$('#bcomenzar').attr('src',"Interfaz/bstart.png");
		$("a[href='UnJugador.html?ES']").attr('href', 'UnJugador.html?EN');
		$("a[href='DosJugadores.html?ES']").attr('href', 'DosJugadores.html?EN');
		$("a[href='Main.html?ES']").attr('href', 'Main.html?EN');
	}
				
	function spanish(){
		$('#pausa').attr('src',"Interfaz/pausa.png");
		$('#level').attr('src',"Interfaz/nivel1.png");
		$('#bcomenzar').attr('src',"Interfaz/bcomenzar.png");
		$("a[href='UnJugador.html?ES']").attr('href', 'UnJugador.html?ES');
		$("a[href='DosJugadores.html?ES']").attr('href', 'DosJugadores.html?ES');
		$("a[href='Main.html?EN']").attr('href', 'Main.html?ES');
	}
	
	//Botón comenzar
	$("#bcomenzar").click(function(){
		$("#bcomenzar, #level").fadeOut( "slow", function() {
			$("#bcomenzar, #level").remove();
				$("#interfaz").fadeIn( "slow", function() {
					$("#interfaz").append('<img id="bpause" src="Interfaz/bpause.png" style="cursor:url(Interfaz/cursorPointer.png), pointer">').children(':last').hide().fadeIn("slow");
					   begin = true;
					});
				});										
			});	
	
	//Botón pausa
	$("#interfaz").on('click','#bpause', function(){
		parameters = location.search.substring(1).split("&").toString();
		if(parameters ==="ES"){
			$("#interfaz").append('<div id="intPause"/>');
			$("#interfaz").append('<img id="pausa" src="Interfaz/pausa.png"/>');
			$("#interfaz").append('<div id="divreiniciar"><img id="breiniciar" src="Interfaz/breiniciar.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
			$("#interfaz").append('<div id="divsalir"><img id="bsalir" src="Interfaz/bsalir.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
			$("#interfaz").append('<div id="divvolver"><img id="bv" src="Interfaz/bvolver.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
		}				
		else{
			$("#interfaz").append('<div id="intPause"/>');
			$("#interfaz").append('<img id="pausa" src="Interfaz/pause.png"/>');
			$("#interfaz").append('<div id="divreiniciar"><img id="breiniciar" src="Interfaz/brestart.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
			$("#interfaz").append('<div id="divsalir"><img id="bsalir" src="Interfaz/bexit.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
			$("#interfaz").append('<div id="divvolver"><img id="bv" src="Interfaz/breturn.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
			}					
		});
		
		//Botón reiniciar
		$("#interfaz").on('click','#breiniciar', function(){					
			$("#breiniciar, #bsalir, #bv, #divreiniciar, #divsalir, #divvolver").remove();
				if(parameters ==="ES"){
					$("#interfaz").append('<img id="reiniciar" src="Interfaz/reiniciar.png"/>');
					$("#interfaz").append('<div id="divconfirmar"><img id="bsi" src="Interfaz/bsi.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/><img id="bno" src="Interfaz/bno.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
				}
				else{
					$("#interfaz").append('<img id="reiniciar" src="Interfaz/restart.png"/>');
					$("#interfaz").append('<div id="divconfirmar"><img id="bsi" src="Interfaz/byes.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/><img id="bno" src="Interfaz/bno.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
				}
			});
				
			$("#interfaz").on('click','#bsi', function(){					
					//fundido a negro y reiniciar nivel.
			});
				
			$("#interfaz").on('click','#bno', function(){
				$("#reiniciar, #salir, #divconfirmar, #bsi, #bno, #divreiniciar, #divsalir, #divvolver").remove();
					if(parameters ==="ES"){						
						$("#interfaz").append('<div id="divreiniciar"><img id="breiniciar" src="Interfaz/breiniciar.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
						$("#interfaz").append('<div id="divsalir"><img id="bsalir" src="Interfaz/bsalir.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
						$("#interfaz").append('<div id="divvolver"><img id="bv" src="Interfaz/bvolver.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
					}
					else{
						$("#interfaz").append('<div id="divreiniciar"><img id="breiniciar" src="Interfaz/brestart.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
						$("#interfaz").append('<div id="divsalir"><img id="bsalir" src="Interfaz/bexit.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
						$("#interfaz").append('<div id="divvolver"><img id="bv" src="Interfaz/breturn.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
					}
				});
			//Botón salir	
			$("#interfaz").on('click','#bsalir', function(){					
				$("#breiniciar, #bsalir, #bv, #divreiniciar, #divsalir, #divvolver").remove();
					if(parameters ==="ES"){
						$("#interfaz").append('<img id="salir" src="Interfaz/salir.png"/>');
						$("#interfaz").append('<div id="divconfirmar"><img id="bsisalir" src="Interfaz/bsi.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/><img id="bno" src="Interfaz/bno.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
					}
					else{
						$("#interfaz").append('<img id="salir" src="Interfaz/exit.png"/>');
						$("#interfaz").append('<div id="divconfirmar"><img id="bsisalir" src="Interfaz/byes.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/><img id="bno" src="Interfaz/bno.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');					
					}
				});
				
			$("#interfaz").on('click','#bsisalir', function(){
				if(parameters ==="ES"){
					$(location).attr('href', 'Main.html?ES')
				}
				else{
					$(location).attr('href', 'Main.html?EN')
					}
				});
				
			$("#interfaz").on('click','#bv', function(){					
				$("#pausa, #reiniciar, #salir, #intPause, #divconfirmar, #bsi, #bno, #divreiniciar, #divsalir, #divvolver").remove();
				//gameloop start
			});
			
			var finale;
			//GAME OVER
				if (finale == false){
					parameters = location.search.substring(1).split("&").toString();
					if(parameters ==="ES"){
						$("#interfaz").append('<div id="intPause"/>');
						$("#interfaz").append('<img id="pausa" src="Interfaz/gameover.png"/>');
						$("#interfaz").append('<img id="punt" src="Interfaz/puntuacion.png"/>');
						//Poner puntuacion
						//Si consigue mejor puntuacion que alguna del top10 se pide nombre.
						$("#interfaz").append('<div id="divgameover"><img id="breintentarover" src="Interfaz/breintentar.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/><img id="bpuntuacionesover" src="Interfaz/bpuntuaciones.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');					
					}				
					else{
						$("#interfaz").append('<div id="intPause"/>');
						$("#interfaz").append('<img id="pausa" src="Interfaz/gameover.png"/>');
						$("#interfaz").append('<img id="punt" src="Interfaz/score.png"/>');
						//
						//
						$("#interfaz").append('<div id="divgameover"><img id="breintentarover" src="Interfaz/btryagain.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/><img id="bpuntuacionesover" src="Interfaz/bscores.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/><img id="bsalirover" src="Interfaz/bexit.png" style="cursor:url(cursorPointer.png), pointer"/></div>');
					}
				}
				
			$("#interfaz").on('click','#breintentarover', function(){					
					//reiniciar gameloop;
			});
				
			$("#interfaz").on('click','#bpuntuacionesover', function(){					
				$("#punt, #pausa, #gameover, #breintentarover, #divgameover, #bsalirover, #bpuntuacionesover").remove();
				if(parameters ==="ES"){
					$("#interfaz").append('<img id="bestscore" src="Interfaz/mejorespuntuaciones.png"/>');
					//poner puntuaciones
					$("#interfaz").append('<div id="divvolverscore"><img id="bvolverscore" src="Interfaz/bvolver.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
				}
				else{
					$("#interfaz").append('<img id="bestscore" src="Interfaz/bestscores.png"/>');
					//poner puntuaciones
					$("#interfaz").append('<div id="divvolverscore"><img id="bvolverscore" src="Interfaz/breturn.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
				}
			});
				
			$("#interfaz").on('click','#bvolverscore', function(){
				$("#bestscore, #divvolverscore, #bvolverscore").remove();
					if(parameters ==="ES"){						
						$("#interfaz").append('<img id="pausa" src="Interfaz/gameover.png"/>');
						$("#interfaz").append('<img id="punt" src="Interfaz/puntuacion.png"/>');
						//Poner puntuacion
						//Si consigue mejor puntuacion que alguna del top10 se pide nombre.
						$("#interfaz").append('<div id="divgameover"><img id="breintentarover" src="Interfaz/breintentar.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/><img id="bpuntuacionesover" src="Interfaz/bpuntuaciones.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/><img id="bsalirover" src="Interfaz/bsalir.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
					}
					else{
						$("#interfaz").append('<img id="pausa" src="Interfaz/gameover.png"/>');
						$("#interfaz").append('<img id="punt" src="Interfaz/score.png"/>');
						//Poner puntuacion
						//Si consigue mejor puntuacion que alguna del top10 se pide nombre.
						$("#interfaz").append('<div id="divgameover"><img id="breintentarover" src="Interfaz/btryagain.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/><img id="bpuntuacionesover" src="Interfaz/bscores.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/><img id="bsalirover" src="Interfaz/bexit.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
					}
				});
				
			$("#interfaz").on('click','#bsalirover', function(){
				if(parameters ==="ES"){
					$(location).attr('href', 'Main.html?ES')
				}
				else{
					$(location).attr('href', 'Main.html?EN')
				}
			});

			//LevelComplete
			if (finale == true){
				parameters = location.search.substring(1).split("&").toString();
				if(parameters ==="ES"){
					$("#interfaz").append('<div id="intPause"/>');
					$("#interfaz").append('<img id="levelcomplete" src="Interfaz/nivelcompletado.png"/>');
					$("#interfaz").append('<img id="punt" src="Interfaz/puntuacion.png"/>');
					//Poner puntuacion
					//Si consigue mejor puntuacion que alguna del top10 se pide nombre.
					$("#interfaz").append('<div id="divgameover"><img id="breiniciarcompleted" src="Interfaz/breiniciar.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/><img id="bsalircompleted" src="Interfaz/bsalir.png" style="cursor:pointer"/><img id="bnextcompleted" src="Interfaz/bsiguiente.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');					
				}				
				else{
					$("#interfaz").append('<div id="intPause"/>');
					$("#interfaz").append('<img id="levelcomplete" src="Interfaz/levelcompleted.png"/>');
					$("#interfaz").append('<img id="punt" src="Interfaz/score.png"/>');
					//
					//
					$("#interfaz").append('<div id="divgameover"><img id="breiniciarcompleted" src="Interfaz/brestart.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/><img id="bsalircompleted" src="Interfaz/bexit.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/><img id="bnextcompleted" src="Interfaz/bnext.png" style="cursor:url(Interfaz/cursorPointer.png), pointer"/></div>');
				}
			}
				
			$("#interfaz").on('click','#breiniciarcompleted', function(){					
				//reiniciar gameloop;
			});
				
			$("#interfaz").on('click','#bsalircompleted', function(){					
				if(parameters ==="ES"){
					$(location).attr('href', 'Main.html?ES')
				}
				else{
					$(location).attr('href', 'Main.html?EN')
				}
			});
				
			$("#interfaz").on('click','#bnextcompleted', function(){
				parameters = location.search.substring(1).split("&").toString();
				if(parameters ==="ES"){
					$("#bnextcompleted, #intPause, #levelcomplete, #punt,#divgameover,#breiniciarcompleted,#bsalircompleted").remove();
					$('#pausa').attr('src',"Interfaz/pause.png");
					$('#level').attr('src',"Interfaz/nivel2.png");
					$('#bcomenzar').attr('src',"Interfaz/bcomenzar.png");
				}
				else{
					$("#bnextcompleted, #intPause, #levelcomplete, #punt,#divgameover,#breiniciarcompleted,#bsalircompleted").remove();
					$('#pausa').attr('src',"Interfaz/pause.png");
					$('#level').attr('src',"Interfaz/level2.png");
					$('#bcomenzar').attr('src',"Interfaz/bstart.png");
				}
			});
				
});