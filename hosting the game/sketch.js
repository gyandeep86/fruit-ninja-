var orng, orngImg;
var apple, appleImg;
var peach, peachImg;
var ban, banImg;
var bac, bacImg;
var bac1, bac1Img;
var nif, nifImg, nifAud;
var PLAY = 1;
var END = 0;
var gameState = 1;
var score = 0;
var goaud, go, goImg



function preload() {
  orngImg = loadImage("fruit1.png");
  appleImg = loadImage("fruit2.png");
  peachImg = loadImage("fruit3.png");
  banImg = loadImage("fruit4.png");
  bacImg = loadAnimation("alien1.png", "alien2.png");
  nifImg = loadImage("sword.png");
  goImg = loadImage("gameover.png");
  goaud = loadSound("gameover.mp3");
  nifAud = loadSound("knifeSwooshSound.mp3")

}


function setup() {
  createCanvas(500, 500);

  go = createSprite(250, 250, 50, 50)
  go.addImage("gov", goImg);
  go.scale = 2;

  nif = createSprite(200, 50, 50, 50);
  nif.addImage("nife", nifImg);
  nif.scale = 0.7;


  fruitGroup = createGroup();
  bacGroup = createGroup();
}

function draw() {
  background(0, 255, 255);

  if (gameState === PLAY) {
    fruits();
    bac();
    nif.y = World.mouseY;
    nif.x = World.mouseX;
    go.visible = false;

    if (fruitGroup.isTouching(nif)) {
      fruitGroup.destroyEach()
      score = score + 2
      nifAud.play();
    } else {
      if (bacGroup.isTouching(nif)) {
        gameState = END;
        goaud.play();
        fruitGroup.destroyEach()
        bacGroup.destroyEach()
        go.visible = true;
      }
    }
  }

  if(keyWentDown("space") && gameState === END){
    gameState = PLAY;
    score = 0
  }
  
  drawSprites();
  text("score:" + score, 300, 30)
}

function bac() {
  if (World.frameCount % 400 === 0) {
    bact = createSprite(420, 0, 50, 50);
    bact.addAnimation("bact", bacImg);
    bact.scale = 0.7;
    bact.velocityX = -(8+(score/10));
    bact.setLifetime = 400;
    bact.y = Math.round(random(100, 300))
    bacGroup.add(bact);
    
  }

}

function fruits() {
  if (World.frameCount % 50 === 0) {

    fruit = createSprite(420, 200, 20, 50);
    fruit.scale = 0.3;
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(orngImg);
    } else if (r == 2) {
      fruit.addImage(appleImg);

    } else if (r == 3) {
      fruit.addImage(peachImg);

    } else {
      fruit.addImage(banImg);

    } 
    
    fruit.velocityX = -(8+(score/10));
    fruit.y = Math.round(random(50, 340))
    fruit.setLifetime = 400;
    fruitGroup.add(fruit);
  }



}