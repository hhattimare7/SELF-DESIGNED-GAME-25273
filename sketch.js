var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var creatureSpawner, creatureSpawnerImg;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var bullet
var bulletImg
var hero
var heroImg
var life=3
var zombieGroup;



function preload(){
  
 bulletImg= loadImage("Bullet.png")
 hero= loadImage("Hero.png")



  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

  creatureSpawnerImg = loadImage("Background Images - Anish/Creature Spawner.png");

}

function setup() {

  
  
  createCanvas(windowWidth,windowHeight);

  //adding the background image

  
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg);
   player.scale = 0.3
   //player.debug = true
   player.setCollider("rectangle",0,0,300,300)


bullet = createSprite(player.x, player.y);
bullet.addImage(bulletImg);
bullet.visible=false;
bullet.scale=0.3


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
    heart1.visible=false;
    heart2.visible=false;
    heart3.visible=false;

    //creating group for zombies    
    zombieGroup = new Group();

    edges = createEdgeSprites();
}

function draw() {
  background(0); 
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
  player.bounceOff(edges);
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
 player.bounceOff(edges);
}

if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+30
  player.bounceOff(edges);
 }

 if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-30
  player.bounceOff(edges);
 }

//release bullets and change the image of shooter to shooting position when space is pressed
//After Getting Bullet Image make code to shoot the bullet
if(keyWentDown("space")) {
  
  player.addImage(shooter_shooting)
  bullet.visible=true;
  bullet.velocityX=5
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)

}


//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){
 life=life-1

 zombieGroup.destroyEach();


    
 }
if(life===3){
  heart1.visible=true;
    heart2.visible=true;
    heart3.visible=true;

}

else if(life==2){
  heart1.visible=false;
  heart2.visible=true;
  heart3.visible=true; 
}

else if(life=1){
  heart1.visible=false;
  heart2.visible=false;
  heart3.visible=true; 

}


//calling the function to spawn zombies
spawner();

enemy();

drawSprites();
}

function spawner(){
  creatureSpawner = createSprite(windowWidth - 70 ,windowHeight/2,40,40);
  creatureSpawner.addImage(creatureSpawnerImg);
  creatureSpawner.scale = 1;
}

//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(windowWidth - 70 ,windowHeight/2,40,40);

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    //zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
