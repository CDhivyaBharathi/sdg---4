const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var canvas,ground,vGround;
var bgImg,backImage;
var bhoviyaImg,bhoviya;
var jImg,jButton;
var rImg,rButton;
var bhoviya_running;
var k1,k2,k3,k4,k5,k6;
var virus_Img, coin_Img, vaccine_Img;
var keysGroup, coinsGroup, virusGroup, vaccineGroup,coins1Group;
var keyCount = 0;
var lifeCount = 3;
var coinCount = 0;


function preload(){
    bgImg = loadImage("b1.png");
    jImg = loadImage("jumpButton.png");
    rImg = loadImage("runButton.png");
    bhoviya_running = loadAnimation("g1.png","g2.png","g3.png","g4.png","g5.png","g6.png");
    k1 = loadImage("1.png");
    k2 = loadImage("2.png");
    k3 = loadImage("3.png");
    k4 = loadImage("4.png");
    k5 = loadImage("5.png");
    k6 = loadImage("6.png");
    k7 = loadImage("7.png");
    virus_Img = loadImage("Corona.png");
    coin_Img = loadImage("coins.png");
    vaccine_Img = loadImage("vaccine.png");

}

function setup(){
   canvas = createCanvas(displayWidth - 50, displayHeight - 200);
   backImage = createSprite((displayWidth - 50)/2, (displayHeight - 200)/2);
   backImage.addImage(bgImg);
   backImage.scale = 2;
  
  //backImage.x = backImage.width/2;

    bhoviya = createSprite((displayWidth - 50)/8,(displayHeight - 450),50,50);
    bhoviya.addAnimation("bhoviya",bhoviya_running);
    bhoviya.scale = 0.8;
    bhoviya.debug = true;
    bhoviya.setCollider("rectangle",0,0,80,175);
    


    ground = createSprite((displayWidth - 50)/2,(displayHeight - 20),(displayWidth - 50)+(displayWidth - 50),20);
    //ground.visible = false;

    vGround = createSprite((displayWidth-50)/2,(displayHeight - 200),(displayWidth - 50),20);

    jButton = createSprite((displayWidth - 50)/1.5 + 300,(displayHeight - 300),50,50);
    jButton.addImage("jumpButton",jImg);
    jButton.scale = 0.8;

    //rButton = createSprite((displayWidth - 50)/1.5+275,(displayHeight - 250));
    //rButton.addImage("runButton",rImg);
    //rButton.scale = 0.8;

    keysGroup = new Group();
    coinsGroup = new Group();
    vaccineGroup = new Group();
    virusGroup = new Group();
    coins1Group = new Group();

    

    
}

function draw(){
    background(0);
    fill ("White")
    textSize(25);
   
    ground.velocityX = -2;
    backImage.velocityX = -3;

    //scoreCount = scoreCount + Math.round(getFrameRate()/60);
    
    if(keysGroup.isTouching(bhoviya)){
      keysGroup.destroyEach();
      keyCount = keyCount+1;

    }

    if(virusGroup.isTouching(bhoviya)){
      virusGroup.destroyEach();
      lifeCount = lifeCount-1;
    }

    if(coinsGroup.isTouching(bhoviya)){
       coinsGroup.destroyEach();
       coinCount = coinCount+1;
     }

     if(coins1Group.isTouching(bhoviya)){
      coins1Group.destroyEach();
      coinCount = coinCount+1;
    }

     if(coinCount%2 === 0 && coinCount !== 0){
       lifeCount = lifeCount+1;
     }
      
     if(mousePressedOver(jButton) ) {
        bhoviya.velocityY = -20;
    }
    bhoviya.velocityY = bhoviya.velocityY + 0.8;
    bhoviya.collide(vGround);



    //if(mousePressedOver(rButton)) {
       // bhoviya.velocityX = +5;
        //bhoviya.velocityY = 0;
    //}

    if(ground.x<0){
       ground.x = ground.width/2;
    }
    if(backImage.x<0){
      backImage.x = backImage.width/2;
    }
     spawnKeys();
     spawnVirus();
     spawnVaccine();
     spawnCoins();
    drawSprites();
    text("Keys Count: "+ keyCount, (displayWidth - 50)/18,displayHeight - 825);
    text("Coins: "+ coinCount, (displayWidth - 50)/18,displayHeight - 800);
    text("Life: "+ lifeCount, (displayWidth - 50)/18,displayHeight - 775);
    
    
}   

function spawnKeys() {
    if(frameCount % 500 === 0) {
      var keys = createSprite(displayWidth/1,displayHeight/4,10,40);
      keys.velocityX = -4;
      keys.y = Math.round(random(displayHeight - 650,displayHeight - 800));
      var rand = Math.round(random(1,7));
      switch(rand) {
        case 1: keys.addImage(k1);
                break;
        case 2: keys.addImage(k2);
                break;
        case 3: keys.addImage(k3);
                break;
        case 4: keys.addImage(k4);
                break;
        case 5: keys.addImage(k5);
                break;
        case 6: keys.addImage(k6);
                break;
        case 7: keys.addImage(k7);
                break;
        default: break;
      }          
      keys.scale = 0.5;
      keys.lifetime = 600;
      keys.debug = true;
      keysGroup.add(keys);
    }
  }

  function spawnVirus() {
    if (frameCount % 210 === 0) {
      var virus = createSprite(displayWidth/1,displayHeight/4,10,40);
      virus.y = Math.round(random(displayHeight - 550,displayHeight - 750));
      virus.addImage(virus_Img);
      virus.scale = 0.3;
      virus.velocityX = -3;
      virus.lifetime = 600;
      virus.depth = bhoviya.depth;
      bhoviya.depth = bhoviya.depth + 1;
      virusGroup.add(virus);
    }
    
  }

  function spawnVaccine() {
        if (frameCount % 130 === 0) {
          var vaccine = createSprite(displayWidth/1,displayHeight/4,10,40);
          vaccine.y = Math.round(random(displayHeight - 600,displayHeight - 750));
          vaccine.addImage(vaccine_Img);
          vaccine.scale = 0.3;
          vaccine.velocityX =-(random(3,7));
          vaccine.lifetime = 600;
          vaccine.depth = bhoviya.depth;
          bhoviya.depth = bhoviya.depth + 1;
          vaccineGroup.add(vaccine);
        }
        
      }


      function spawnCoins() {
        if (frameCount % 90 === 0) {
          var coins = createSprite(displayWidth/1,displayHeight/4,10,40);
          coins.y = Math.round(random(displayHeight - 600,displayHeight - 750));
          coins.addImage(coin_Img);
          coins.scale = 1;
          coins.velocityX = -3;
          coins.lifetime = 600;
          coins.depth = bhoviya.depth;
          bhoviya.depth = bhoviya.depth + 1;
          coinsGroup.add(coins);
        }
        if (frameCount % 150 === 0){
          var coins1 = createSprite(displayWidth/1,displayHeight/4,10,40);
          coins1.y = Math.round(random(displayHeight - 600,displayHeight - 750));
          coins1.addImage(coin_Img);
          coins1.scale = 1;
          coins1.velocityX = -3;
          coins1.lifetime = 600;
          coins1.depth = bhoviya.depth;
          bhoviya.depth = bhoviya.depth + 1;
          coins1Group.add(coins1);
        }
        
      }

