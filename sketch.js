var villageI,bg,runner,runnerI,o1I,o2I,o3I,o1,o2,o3,coinI,coin
var invisibleGround
var obstacleGrp,bonusGrp,gameoverI,o
var PLAY = 1
var END = 0
var gameState = PLAY
var score

function preload(){
 villageI = loadImage("jungle.jpg")
 runnerI = loadImage("run2.gif")
 o1I = loadImage("o1.png")
 o2I = loadImage("o2.png")
 o3I = loadImage("o3.png")
 coinI = loadImage("spincoin.gif")
 gameoverI = loadImage("gameover.png")
}

function setup() {
  
  createCanvas(650,475)
 bg = createSprite(300,240)
 bg.addImage(villageI)
 bg.velocityX = -8
 bg.scale = 1.3
  
  runner = createSprite(80,360,20,20)
  runner.addImage(runnerI)
  runner.scale = 1.6
  runner.setCollider("rectangle",0,5,40,62,0)
  runner.debug = false
  
  obstacleGrp = new Group()
  bonusGrp = new Group()
  
 invisibleGround = createSprite(325,450,650,5);
 invisibleGround.visible = false
  
 score = 0
  
}

function draw() {
 background("red") 
  
 if (bg.x<245) {
   bg.x = 400
 }
  
  
  if (keyWentDown("space")) {
    runner.velocityY = -25
  }
   
  runner.velocityY = runner.velocityY+1.9
  
  if (runner.isTouching(bonusGrp)) {
    score = score+1
    bonusGrp.destroyEach()
  }

  if (runner.isTouching(obstacleGrp)) {
    gameState = END
  }
  
  if (gameState==END) {
    runner.x = 320
    runner.y = 250
    runner.addImage(gameoverI)
    runner.scale = 2
    obstacleGrp.destroyEach()
    bonusGrp.destroyEach()
    bg.velocityX = 0
  }
   obstacles()
  bonus()
  
 runner.collide(invisibleGround)
  
 drawSprites()
  fill("red")
  textSize(20)
  text("Score: "+ score, 500,50)
}

 function obstacles() {
  if (World.frameCount%100==0) {
    o = Math.round(random(1,3))
    
  if (o==1) {
   o1 = createSprite(620,435,50,50)
   o1.velocityX = -8
   o1.addImage(o1I)
   o1.scale = 0.13
   o1.setCollider("rectangle",0,0,60,30,40)
    o1.debug = false
   obstacleGrp.add(o1)
  }
  else if (o==2) {
   o2 = createSprite(620,425,50,50)
   o2.velocityX = -8
   o2.addImage(o2I)
   o2.scale = 0.13
    o2.setCollider("rectangle",0,0,50,50,0)
    o2.debug = false
   obstacleGrp.add(o2)
    }
  else if (o==3) {
   o3 = createSprite(620,430,50,50)
   o3.velocityX = -8
   o3.addImage(o3I)
   o3.scale = 0.45
   o3.setCollider("rectangle",0,0,60,30,0)
    o3.debug = false
   obstacleGrp.add(o3)
  }
  } 
 }

 function bonus() {
   if (World.frameCount%200==0) {
     coin = createSprite(640,360,20,20)
     coin.addImage(coinI)
     coin.scale = 0.25
     coin.velocityX = -10 
     coin.lifetime = 130
     bonusGrp.add(coin)
   }
 }