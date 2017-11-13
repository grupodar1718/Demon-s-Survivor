var pjImg = new Image();
pjImg.src = "Prota.png";

var skeletonImg = new Image();
skeletonImg.src = "Skeleton.png";

var vampireImg = new Image();
vampireImg.src = "Vampire.png";

var demonImg = new Image();
demonImg.src = "Demon.png";

var fireMobImg = new Image();
fireMobImg.src = "Firemob.png";

var fireImg = new Image();
fireImg.src = "Fire.png";

var fondoImg = new Image();
fondoImg.src = "Mapa1.png";

var skeletons = [];
var vampires = [];
var demons = [];
var fireMobs = [];
var fires = [];

var id = 0;

function sprite (options) {
  var that = {},
      frameIndex = 0,
      tickCount = 0,
      numberOfFramesX = options.numberOfFramesX || 9,
      numberOfFramesY = options.numberOfFramesY || 4;
  that.ticksPerFrame = options.ticksPerFrame;
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
  that.count = options.count;

  that.render = function (){   
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
    
    if(tickCount > that.ticksPerFrame){
      tickCount = 0;
      
      if(frameIndex < numberOfFramesX - 1 && that.stop == false){
        frameIndex += 1;
      }else{
        frameIndex = 0;
      }
      
    }
    
  };


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
   // alert(that.count);
   if(that.count == 50){
      that.count = 0;
      /*if(that.fire.)
      if(that.fire.length == 4){
        for(var i = 0; i < fires.length; i++){
          if(that.fire[3].id == fires[i].id ){
            fires.splice(i, 1);
          }
        }  
        that.fire.splice(3, 1);
      }*/
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


var canvas = document.getElementById("pjAnimation");
canvas.width = 800;
canvas.height = 600;

var pj = sprite ({
  context: canvas.getContext("2d"),
  ticksPerFrame: 3,
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

function gameLoop () {

  window.requestAnimationFrame(gameLoop);

  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,800,600);
  ctx.drawImage(fondoImg, 0, 0);

 

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
  
  checkFires();
  checkSkeletons();
  checkVampires();
  checkDemons();
  checkfireMobs();
  
}

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
	        pj.yPos,
	        pj.yPos + 50,
	        pj.xPos,
	        pj.xPos + 50,
	        skeletons[i].yPos,
	        skeletons[i].yPos + 50,
	        skeletons[i].xPos + 20,
	        skeletons[i].xPos + 30 || skeletons[i] != null))
	      {
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
          pj.yPos,
          pj.yPos + 50,
          pj.xPos,
          pj.xPos + 50,
          vampires[i].yPos,
          vampires[i].yPos + 50,
          vampires[i].xPos + 15,
          vampires[i].xPos + 35 || vampires[i] != null))
        {
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
          pj.yPos,
          pj.yPos + 50,
          pj.xPos,
          pj.xPos + 50,
          demons[i].yPos,
          demons[i].yPos + 50,
          demons[i].xPos + 15,
          demons[i].xPos + 35 || demons[i] != null))
        {
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
          pj.yPos,
          pj.yPos + 50,
          pj.xPos,
          pj.xPos + 50,
          fireMobs[i].yPos,
          fireMobs[i].yPos + 50,
          fireMobs[i].xPos + 15,
          fireMobs[i].xPos + 35 || fireMobs[i] != null))
        {
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
          pj.yPos,
          pj.yPos + 50,
          pj.xPos,
          pj.xPos + 50,
          fires[i].yPos,
          fires[i].yPos + 50,
          fires[i].xPos + 15,
          fires[i].xPos + 35 || fires[i] != null))
        {
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

function intersectRect(topA, bottomA, leftA, rightA, topB, bottomB, leftB, rightB) {
  return !(leftB > rightA || 
           rightB < leftA || 
           topB > bottomA ||
           bottomB < topA);
}

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


function move(e){

  if(e.keyCode==39 && pj.xPos<750){
    pj.xSpeed = 3;
    pj.dir = 2;
  }
  if(e.keyCode==37 && pj.xPos>0){
    pj.xSpeed = -3;
    pj.dir = 1;
  }
  if(e.keyCode==40 && pj.yPos<550){
    pj.ySpeed = 3;
    pj.dir = 0;
  }
  if(e.keyCode==38 && pj.yPos>0){
    pj.ySpeed = -3;
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
    pj.frameIndex = 0;
  } 
}

document.onkeydown = move;
document.onkeyup = stop;

pjImg.addEventListener("load", gameLoop);

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

////////////////////////////////RELOJ

toHour=0;
toMinute=2;
toSecond=0;

function countDown()
{
  toSecond=toSecond-1;
  if(toSecond<0)
  {
    toSecond=59;
    toMinute=toMinute-1;
  }
  form.second.value=toSecond;

  form.minute.value=toMinute;

  setTimeout("countDown()",1000);

}