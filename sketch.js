//declaring the variables
var tower,towerImg;
var doorImg,door,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost,ghostImg;
var invisibleBlock,invisibleBlockGroup;
var gameState = "play";

function preload(){

//preloading the images  
  towerImg = loadImage("tower.png");
  doorImg  = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  
}

function setup() {
 
//drawing the canvas  
  createCanvas(600,600);
  
//creating the tower sprite  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
//clling the groups  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
//creating the ghost sprite  
  ghost=createSprite(200,200,50,50);
  ghost.scale=0.3;
  ghost.addImage("ghost",ghostImg);
  
  
}

function draw() {
  
  background(0);
 
//making the play state  
  if(gameState==="play") {

//setting the keys    
   if(keyDown("left"))  {
      ghost.velocityX = -4;
    }
    
   if(keyDown("right")) {
      ghost.velocityX = 4;
    }
  
   if(keyDown("space")) {
      ghost.velocityY = -5;
    }

//adding gravity to the ghost    
  ghost.velocityY=ghost.velocityY+0.8;
    
  if(tower.y>400){
     tower.y=300;
    }
  
//calling the functions    
    spawnDoors();
  
  
//making the ghost rest in the climber  
  if(climbersGroup.isTouching(ghost)) {
      ghost.velocityY=0;
   }
 
//destroying the ghost    
  if(invisibleBlockGroup.isTouching(ghost)||ghost.Y>600){
      ghost.destroy();
      gameState="end";
   }
  
  drawSprites();
    
}

//displaying game over  
  if(gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
  }
    
}

//function for spawning the cloud
function spawnDoors() {
  if(frameCount % 240 === 0) {
      var door=createSprite(200,-50);
      door.addImage(doorImg);
      var climber=createSprite(200,10);
      climber.addImage(climberImg);
      var invisibleBlock=createSprite(200,15);
      invisibleBlock.width=climber.width;
      invisibleBlock.height=2;

      door.x=Math.round(random(120,400));
      door.velocityY=1;
      climber.x = door.x;
      climber.velocityY=1;
      invisibleBlock.x=door.x;
      invisibleBlock.velocityY=1;
      ghost.depth=door.depth;
      ghost.depth=ghost.depth+=1;


      climber.lifetime=800; 
      door.lifetime=800;
      invisibleBlock.lifetime=800;
      doorsGroup.add(door);
      climbersGroup.add(climber);
      invisibleBlock.debug=true;
      invisibleBlockGroup.add(invisibleBlock);
  }
}

