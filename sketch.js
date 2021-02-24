var PLAY=1,END=0;
var gameState=PLAY;

var marioImg,mario,coinImg;
var obs1Img,obs2Img,obs3Img;
var gameoverImg,restartImg,gameover,restart;
var Grnd,mario,score;
var obstaclesGroup,coinGroup;
var marioDeadImg;

function preload()
{
  marioImg=loadAnimation("Capture1.png","Capture3.png","Capture4.png");
  coinImg=loadImage("coin.png");
  obs1Img=loadImage("obstacle1.png");
  obs2Img=loadImage("obstacle2.png");
  obs3Img=loadImage("obstacle3.png");
  gameoverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  marioDeadImg=loadAnimation("mariodead.png");
  
}

function setup()
{
  createCanvas(600,200);
  //Invisible Ground
  Grnd=createSprite(300,180,600,10);
  
  //Mario
  mario=createSprite(50,150,5,5);
  mario.addAnimation("playing",marioImg);
  mario.scale=0.4;
  
  //Group Instantiation.
  obstaclesGroup=new Group();
  coinGroup=new Group();
  
  //Game Over and Restart Images.
  gameover=createSprite(300,100,5,5);
  gameover.addImage(gameoverImg);
  restart=createSprite(300,140,5,5);
  restart.addImage(restartImg);
  gameover.scale=0.4;
  restart.scale=0.4;
  
  gameover.visible=false;
  restart.visible=false;
  
}

function draw()
{
  background("blue");
  mario.collide(Grnd);
  if(gameState===PLAY)
    {
      //Jumping Mario...
      if(keyDown("SPACE") && mario.y>=147)
        {
          mario.velocityY=-10;
        }
      mario.velocityY+=0.5;
      //Jumping Mario...
      
      score=round((frameCount/getFrameRate()));
      
      //Invoking Obstacles Function
      obstacleSpawn();
      coinSpawn();
      
      if(obstaclesGroup.isTouching(mario))
        {
          gameState=END;
          
        }
    }
  else if(gameState===END)
    {
      obstaclesGroup.setVelocityXEach(0);
      coinGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      coinGroup.setLifetimeEach(-1);
      
      mario.velocityY=0;
      gameover.visible=true;
      restart.visible=true;
      //mario.changeAnimation("collided",marioDeadImg);
      reset();
    }
  drawSprites();
}

function obstacleSpawn()
{
  if(frameCount%50==0)
    {
      var obstacle=createSprite(600,158,5,5);
      obstacle.velocityX=-(6+score/100);
      obstacle.lifetime=200;
      switch(round(random(1,3)))
        {
          case 1:obstacle.addImage(obs1Img);
            break;
            case 2:obstacle.addImage(obs2Img);
            break;
            case 3:obstacle.addImage(obs3Img);
            break;
            default:break;
        }
      obstacle.scale=0.2;
      obstaclesGroup.add(obstacle);
    }
  
}

function coinSpawn()
{
  if(frameCount%40==0)
    {
      var coin=createSprite(600,round(random(140,148)),5,5);
      coin.velocityX=-(6+score/100);
      coin.addImage(coinImg);
      coin.lifetime=200;
      coin.scale=0.1;
      coinGroup.add(coin);
    }
  
}

function reset()
{
  if(mousePressedOver(restart))
    {
      gameState=PLAY;
      gameover.visible=false;
      restart.visible=false;
      obstaclesGroup.destroyEach();
      coinGroup.destroyEach();
    }
}