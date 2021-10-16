var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg ,zombieGrp;
var bullet,bulletImg,bulletGrp;
var score=0;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  zombieImg = loadImage("assets/zombie.png")

  bulletImg = loadImage ("assets/bulletImg.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

 zombieGrp=new Group();
 bulletGrp=new Group();
}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet = createSprite (player.x+200 ,player.y-25,20,20);
 bullet.addImage(bulletImg);
 bulletGrp.add(bullet);
 player.addImage(shooter_shooting)

 bullet.velocityX = 10;
 bullet.scale = 0.05;
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(zombieGrp.isTouching(player)){
  for(var i=0;i<zombieGrp.length; i++){
    if(zombieGrp[i].isTouching(player)){
      zombieGrp[i].destroy();
    }
  }
}

if(zombieGrp.isTouching(bulletGrp)){
  for(var i=0;i<zombieGrp.length; i++){
    if(zombieGrp[i].isTouching(bulletGrp)){
      zombieGrp[i].destroy();
      bulletGrp.destroyEach();
      score= score+1;

    }
  }
}



enemy();

drawSprites();

textSize(25);
fill("red");
text ("Score: "+ score,windowWidth-200, windowHeight-600);

}

function enemy(){
 if(frameCount%60===0){
  zombie = createSprite(windowWidth+50,random(windowHeight-600,windowHeight-150),40,40);
  zombie.addImage(zombieImg);

  zombie.scale=0.15;
  zombie.velocityX=-3;

  zombie.lifetime = 400;

  zombieGrp.add(zombie);
 }
  


}
