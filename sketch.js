//defining the variables
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var survival, score = 0;
var ground;
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
  //loading the images and animations
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  //create the canvas
  createCanvas(470, 400);
  
  //to create the monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("move", monkey_running);
  monkey.scale = 0.1;
  
  //to create the ground
  ground = createSprite(400, 350, 900, 10);
  
  //to create the groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  //to create the background
  background("white");

  if (gameState === 1) {
    //to call the banana and obstacle
    food();
    obstacles();

    //to display the scores
    stroke("black");
    fill("black");
    textSize(15);
    text("SCORE: " + score, 30, 30);

    //to display the survival time
    stroke("black");
    fill("black");
    textSize(15);
    survival = Math.ceil(frameCount / frameRate());
    text("SURVIVAL TIME: " + survival, 200, 30);
    
    //to give velocity to the ground
    ground.velocityX = -4;
    //to give infinite scrolling effect to the ground
    ground.x = ground.width / 2;

    //to jump the monkey when space key is pressed
    if ((keyDown("space")) && (monkey.y > 210)) {
      monkey.velocityY = -10;
    }
    //adding gravity to the monkey
    monkey.velocityY = monkey.velocityY + 0.8;
    //to collide monkey with the ground
    monkey.collide(ground);

    if ((bananaGroup.isTouching(monkey))) {
      score = score + 1;
      bananaGroup.destroyEach();
    }
    if ((obstacleGroup.isTouching(monkey))) {
      gameState = 0;
    }

  } else if (gameState === 0) {
    
    stroke("black");
    fill("blue");
    textSize(15);
    text("AH! MONKEY GOT HURT", 140, 90);
    
    ground.velocityX = 0;
    
    monkey.visible = false;
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  //to draw the sprites
  drawSprites();
}

function food() {
  //to select random Y positions
  yPosition = Math.round(random(120, 200));
  console.log(yPosition);
  if ((frameCount % 80 === 0)) {
    banana = createSprite(470, yPosition, 10, 10);
    banana.addImage(bananaImage);
    banana.velocityX = -6;
    banana.scale = 0.1;
    banana.lifetime = 82;
    bananaGroup.add(banana);
  }
}

function obstacles() {
  if ((frameCount % 300 === 0)) {
    obstacle = createSprite(470, 327, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.scale = 0.1;
    obstacle.lifetime = 97;
    obstacleGroup.add(obstacle);
  }
}