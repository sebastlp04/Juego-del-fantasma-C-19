var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.35;


  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup  = new Group();

}


function draw() {
  background(200);

  if(gameState == "play")
  {
    if(tower.y > 400){
      tower.y = 300
    }

    if(keyIsDown(RIGHT_ARROW))
    {
      ghost.x = ghost.x + 2; 
    }

    if(keyIsDown(LEFT_ARROW))
    {
      ghost.x = ghost.x - 2; 
    }

    if(keyDown("space"))
    {
      ghost.velocityY = -5;

    }

    ghost.velocityY = ghost.velocityY + 0.3;

    if(climbersGroup.isTouching(ghost))
    {
      ghost.velocityY = 0;
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600)
    {
      ghost.destroy();
      gameState = "end";
    }

    spawnDoors();
  drawSprites();
  }
  
  if(gameState == "end")
  {
    background("black");
    fill("white")
    textSize(20);
    text("GAME OVER", 245,300);
  }

 
}

function spawnDoors()
{
  if (frameCount % 240 == 0)
  {
    door = createSprite (200,-50);
    climber = createSprite(200,10);
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.addImage("door",doorImg);
    climber.addImage("climber", climberImg);

    door.x = Math.round(random(120,400));
    climber.x  = door.x;
    invisibleBlock.x = door.x;

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    door.lifetime = 700;
    climber.lifetime = 700;
    invisibleBlock.lifetime = 700;
    invisibleBlock.debug = true; 

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

  }
}