
//constants for gamestates
const start = 0;
const play = 1;
const lose = 2;
const pause = 3;
//gameState var
var GameState = start;
//fullscreensImages
var BackgroundImg,backgroundSprite,startImg,pauseStateImg;
//all sprites
var shooter,motherNave,startSprite,gameOverSprite,collisionNaveSprite,
    controlStatus,boxScore,boxHp,boxVelocity,pauseBtn,pauseStateSprite;
//keys
var spaceKey, spaceKeyImg,spaceKeyShootingImg;
var leftArrow, leftArrowImg,leftArrowActImg;
var rightArrow, rightArrowImg,rightArrowActImg;
//animations/images
var shooterImg,shootingAnmtn,
    motherNaveImg,motherNaveDiyingAnmtn,
    motherNave25,motherNave10,lightRayImg,meteorImg,boxImg,plusImg,gameOverImg,
    musicOffImg, musicOnImg,
    followMouseImg,leftAndRightImg,pauseBtnImg;
//boolean values
var isRealShooting = false;
var gameIsOver = false;
var isFollowingMouse = false;
var song1IsPlaying = true;
//sounds
var song1,song2,explosionSound;
//informations for player
var hp = 100;
var rockForce = 10;
var score = 0;
var spaceVelocity = 1;
//rank const
const Begginer = 100;
const Advanced = 400;
const Profesional = 1000;
const Expert = 5000;
const Master = 10000;
const GodLike = 100000;
var rank = "noob";
//groups
var rocks,lightRayGroup,plusPowerUpGroup;
//Value to take the last item of "lightRayGroup"
var index;
//Imagens
function preload() {
  //Plus
  plusImg = loadImage("assets/Others/plusPowerUp.png");
  //song
  song1 = loadSound("/assets/songs/Clair_de_Lune.mp3");
  song2 = loadSound("/assets/songs/Sonic_Blaster.mp3");
  explosionSound = loadSound("/assets/songs/explosion.mp3");
  //background
  BackgroundImg = loadImage("/assets/Others/space.png");
  gameOverImg = loadImage("/assets/Others/gameOver2.png");
  startImg = loadImage("/assets/Others/StartInfo.png");
  pauseStateImg = loadImage("/assets/Others/gamePaused.png")
  //motherNave
  motherNaveImg = loadImage("/assets/NaveMotherImages/motherNave.png");
  motherNaveDiyingAnmtn = loadAnimation("/assets/NaveMotherImages/motherDiying1.png","/assets/NaveMotherImages/motherDiying1.png",
                                        "/assets/NaveMotherImages/motherDiying1.png","/assets/NaveMotherImages/motherDiying2.png",
                                        "/assets/NaveMotherImages/motherDiying2.png","/assets/NaveMotherImages/motherDiying3.png",
                                        "/assets/NaveMotherImages/motherDiying3.png","/assets/NaveMotherImages/motherDiying4.png",
                                        "/assets/NaveMotherImages/MotherExplosion.png","/assets/NaveMotherImages/explosion.png");
  motherNave25 = loadImage("/assets/NaveMotherImages/motherNave25.png");
  motherNave10 = loadImage("/assets/NaveMotherImages/motherNave10.png");
  //shooter
  shooterImg = loadImage("/assets/ShooterImages/player.png");
  //meteor
  meteorImg = loadImage("/assets/Others/meteoro.png");
  //lightRay
  lightRayImg = loadImage("/assets/Others/light.png");
  //box
  boxImg = loadImage("/assets/Others/box.png");
  //keys
  spaceKeyImg = loadImage("/assets/Keys/space key.png");
  spaceKeyShootingImg = loadImage("/assets/Keys/space key shooting.png");
  leftArrowImg = loadImage("/assets/Keys/left-arrow.png");
  rightArrowImg = loadImage("/assets/Keys/right-arrow.png");
  leftArrowActImg = loadImage("/assets/Keys/left-arrow-clicked.png");
  rightArrowActImg = loadImage("/assets/Keys/right-arrow-clicked.png");
  //mouse
  followMouseImg = loadImage("/assets/Others/MouseImg.png");
  leftAndRightImg = loadImage("/assets/Others/left and right.png");
  //pause
  pauseBtnImg = loadImage("/assets/Others/PauseBtn.png");
}
//setup(start-code only configurations)
function setup() {
  //Canvas
  createCanvas(800,750);
  //kill lag
  frameRate(8000);
  //background
  backgroundSprite = createSprite(300,350);
  backgroundSprite.addImage(BackgroundImg);
  backgroundSprite.scale = 1.5;
  backgroundSprite.visible = false;
  //Game paused image
  pauseStateSprite = createSprite(400,375,1000,1000);
  pauseStateSprite.addImage(pauseStateImg);
  pauseStateSprite.scale = 2;
  pauseStateSprite.visible = false;
  //button to control the type of movimentation mode of the shooter(follow mouse or click left and right)
  controlStatus = createSprite(50,50,100,100);
  controlStatus.addImage(leftAndRightImg);
  controlStatus.scale = 0.2;
  controlStatus.visible = false;
  //end game sprite
  gameOverSprite = createSprite(330,350);
  gameOverSprite.addImage(gameOverImg);
  gameOverSprite.scale = 3;
  gameOverSprite.visible = false;
  //start
  startSprite = createSprite(400,375,800,750);
  startSprite.addImage(startImg);
  startSprite.scale = 1.5
  //MotherNave
  motherNave = createSprite(300,500,600,300);
  motherNave.addImage("normal",motherNaveImg);
  motherNave.addImage("25%",motherNave25);
  motherNave.addImage("10%",motherNave10);
  motherNave.addAnimation("Diying",motherNaveDiyingAnmtn);
  motherNave.scale = 1.5;
  motherNave.visible = false;
  //SHOOTER NAVE
  shooter = createSprite(300,500);
  shooter.addAnimation("normal",shooterImg);
  shooter.scale = 0.2;
  shooter.visible = false;
  //mother nave collision sprite
  collisionNaveSprite = createSprite(300,620,600,200);
  collisionNaveSprite.visible = false;
  //Info box:
  //score
  boxScore = createSprite(700,375);
  boxScore.addImage(boxImg);
  boxScore.scale = 0.78;
  boxScore.visible = false;
  //Hp
  boxHp = createSprite(700,650);
  boxHp.addImage(boxImg);
  boxHp.scale = 0.78;
  boxHp.visible = false;
  //space/nave velocity
  boxVelocity = createSprite(700,100);
  boxVelocity.addImage(boxImg);
  boxVelocity.scale = 0.78;
  boxVelocity.visible = false;
  //Keys
  //space
  spaceKey = createSprite(300,680,200,50);
  spaceKey.addImage(spaceKeyImg);
  spaceKey.scale = 0.4;
  spaceKey.visible = false;
  //left
  leftArrow = createSprite(55,680,50,50);
  leftArrow.addImage(leftArrowImg);
  leftArrow.scale = 0.4;
  leftArrow.visible = false;
  //right
  rightArrow = createSprite(555,680,50,50);
  rightArrow.addImage(rightArrowImg);
  rightArrow.scale = 0.4;
  rightArrow.visible = false;
  //pause
  pauseBtn = createSprite(300,50,100,100)
  pauseBtn.addImage(pauseBtnImg);
  pauseBtn.scale = 0.4;
  pauseBtn.visible = false;
  //Groups
  lightRayGroup = new Group();
  plusPowerUpGroup = new Group();
  rocks = new Group();
}

function draw() {
  background(0);
  //Game mode start
  if (GameState === 0) {
    //Verify if mouse is pressed to:
    if (mousePressedOver(startSprite)) {
      //set gamestate to play constant(1)
      GameState = play;
    }
  }
  //Game mode play
  else if (GameState === 1) {
    //visible sprites in game mode play
    backgroundSprite.visible = true;
    shooter.visible = true;
    motherNave.visible = true
    boxVelocity.visible = true;
    boxHp.visible = true;
    boxScore.visible = true;
    spaceKey.visible = true;
    leftArrow.visible = true;
    rightArrow.visible = true;
    spaceKey.visible = true;
    spaceKey.visible = true;
    controlStatus.visible = true;
    pauseBtn.visible = true;
    rocks.setVisibleEach(true);
    lightRayGroup.setVisibleEach(true);
    //invisible sprites in game mode play
    startSprite.visible = false;
    pauseStateSprite.visible = false;
    //Rect
    fill(40,0,0);
    rect(120,40,700,800);
    //Text
    fill(255,0,0);
    textSize(15)
    text("Life: " + hp,670,655);
    text("Speed: " + spaceVelocity,670,105);
    text("Score: " + score,670,380);
    //verify if is not too fast to:
    if (spaceVelocity > 25) {
      //Back velocity to 25
      spaceVelocity = 25;
    }
    //if space velocity is equal or bigger than 20:
    if (spaceVelocity >= 20) {
      //set "song1IsPlaying" to false boolean value
      song1IsPlaying = false;
    }
    //Song loop
    if (!song1.isPlaying() && song1IsPlaying && !gameIsOver) {
      song1.play();
    }
    if (song2.isPlaying) {
      song2.setVolume(0.1);
    }
    if (!song2.isPlaying() && !song1IsPlaying && !gameIsOver) {
      song2.play();
      song2.setVolume(0.1);
      song1.setVolume(0);
    }
    //if mouse is pressed in "pauseBtn":
    if (mousePressedOver(pauseBtn)) {
      //set gamestate to pause(3)
      GameState = pause;
    }
    //Moving bg
    backgroundSprite.position.y = backgroundSprite.position.y + spaceVelocity;
    if (backgroundSprite.position.y > 1000) {
      backgroundSprite.position.y = 0;
    }
      //Shooter/pc movimentation
    //----don't let the shooter go out of the canvas----//
    if (shooter.position.x < 101) {
      shooter.position.x = 101;
    }
    if (shooter.position.x > 489) {
      shooter.position.x = 489;
    }
    //----mouse movimentation----//
    if (mousePressedOver(controlStatus)) {
      if (!isFollowingMouse) {
        isFollowingMouse = true;
        controlStatus.addImage(followMouseImg);
      }else{
        isFollowingMouse = false;
        controlStatus.addImage(leftAndRightImg);
      }
    }
    ////----left and right arrow movimentation----//
    if (!isFollowingMouse) {
      if (keyDown(LEFT_ARROW) || mousePressedOver(leftArrow)) {
        shooter.position.x = shooter.position.x - 20;
        leftArrow.addImage(leftArrowActImg);
      }else{leftArrow.addImage(leftArrowImg);}
      
      if (keyDown(RIGHT_ARROW) || mousePressedOver(rightArrow)) {
        shooter.position.x = shooter.position.x + 20;
        rightArrow.addImage(rightArrowActImg);
      }else{
        rightArrow.addImage(rightArrowImg);
      }

      rightArrow.visible = true;
      leftArrow.visible = true;
    }else{
      rightArrow.visible = false; leftArrow.visible = false;
      shooter.position.x = World.mouseX;
      if (shooter.position.x < 100) {
        shooter.position.x = 100;
      }
      if (shooter.position.x > 500) {
        shooter.position.x = 500;
      }
    }
    //Less eficient mechanism to don't let the score be fracional(i used thw Math.round after see some bugs with the function isFloat-tutorial in youtube);
    /*
    if (isFloat(score)) {
      score -= 0.5;
    }
    */
    //if mouse is pressing space key(sprite created for future mobile adaptation) or keyboard spacekey is pressed, then:
    if (mousePressedOver(spaceKey) || keyDown("space")) {
      //if is real shooting, then:
      if (!isRealShooting) {
        shootRay();
        spaceKey.addImage(spaceKeyShootingImg);
        isRealShooting = true;
      }
    }
      //else if NOT--mouse is pressing space key(sprite created for future mobile adaptation) or NOT--keyboard spacekey is pressed, then:
    else if (!mousePressedOver(spaceKey) || !keyDown("space")) {
      isRealShooting = false;
      spaceKey.addImage(spaceKeyImg);
    }


    //Change mother nave images from the hp state of the player
    //Normal
    if (hp >= 25) {
      motherNave.changeImage("normal");
      motherNave.scale = 1.5;
    }
    //Diying
    if (hp <= 25) {
      motherNave.changeImage("25%");
      motherNave.scale = 2;
    }
    //almolst diying
    if (hp <= 10) {
      motherNave.changeImage("10%");
      motherNave.scale = 2;
    }
    //if hp is 0, game over
    if (hp <= 0) {
      gameOver();
    }
    //create npcs(elements)
    createElements();
  }
  //gamestate lose
  else if(GameState === 2){
    //invisible sprites in gamestate lose
    startSprite.visible = false;
    backgroundSprite.visible = false;
    shooter.visible = false;
    boxVelocity.visible = false;
    boxHp.visible = false;
    boxScore.visible = false;
    spaceKey.visible = false;
    leftArrow.visible = false;
    rightArrow.visible = false;
    spaceKey.visible = false;
    spaceKey.visible = false;
    pauseBtn.visible = false;
    controlStatus.visible = false;
    plusPowerUpGroup.setVisibleEach(false);
    lightRayGroup.setVisibleEach(false);
    //visible sprite in gamestate lose
    gameOverSprite.visible = true;

    //text
    fill("yellow");
    textSize(50);
    //show rank, final score and final velocity
    text(rank,490,665);
    text(score,260,460);
    text(spaceVelocity,350,545);
  }
  //gamestate pause
  else if(GameState === 3){
    //invisible sprites in gamestate pause
    startSprite.visible = false;
    backgroundSprite.visible = false;
    shooter.visible = false;
    boxVelocity.visible = false;
    boxHp.visible = false;
    boxScore.visible = false;
    spaceKey.visible = false;
    leftArrow.visible = false;
    rightArrow.visible = false;
    spaceKey.visible = false;
    spaceKey.visible = false;
    pauseBtn.visible = false;
    motherNave.visible = false;
    controlStatus.visible = false;
    rocks.setVisibleEach(false);
    lightRayGroup.setVisibleEach(false);
    //visible sprite in gamestate pause
    pauseStateSprite.visible = true;
    //if space key(from keyboard) is pressed, then return to gamestate play(1)
    if (keyDown("space")) {
      GameState = play;
    }
  }
  //draw sprites
  drawSprites();
}

//Função para atirar lasers
function shootRay(){
  //Criar nova variável para laser
  var lightRay = createSprite(shooter.position.x,shooter.position.y,50,10);
  //Configurar imagem
  lightRay.addImage(lightRayImg);
  lightRay.scale = 0.05;
  //Velocidade
  lightRay.velocity.y = -20;
  isShooting = true;
  //Adicionar variável ao grupo  
  lightRayGroup.add(lightRay);
  //Dar a variavel index o valor do tamanho do grupo - 1(ou seja, o ultimo item do grupo)
  index = lightRayGroup.length - 1;
}
//function create elements(npcs)
function createElements() {
  //Create meteors
  if (frameCount % 200 === 0) {
    //new local variable
    var rock = createSprite(Math.round(random(50,550)),-80,50,50);
    rock.addImage(meteorImg);
    rock.scale = 0.5;
    //depth config(not resolved)
    shooter.depth += 2;
    controlStatus.depth += 2;
    pauseBtn.depth += 2;
    //add to global group
    rocks.add(rock);
  }
  if (frameCount % 1000 === 0) {
    //new local variable
    var plusPowerUp = createSprite(Math.round(random(50,550)),-80,50,50);
    plusPowerUp.addImage(plusImg);
    plusPowerUp.scale = 0.5;
    //depth config(not resolved)
    shooter.depth += 2;
    controlStatus.depth += 2;
    pauseBtn.depth += 2;
    //add to global group
    plusPowerUpGroup.add(plusPowerUp);
  }
  //take each meteors and move then down
  for (let index = 0; index < rocks.length; index++) {
    rocks[index].position.y += spaceVelocity;
  }
  for (let index = 0; index < plusPowerUpGroup.length; index++) {
    plusPowerUpGroup[index].position.y += spaceVelocity;
  }
  //if NOT--something is in meteor group, then:
  if (rocks[0] !== undefined) {
    //if meteor group is touching light group(or the opposite-is the same thing), then:
    if (lightRayGroup.isTouching(rocks)) {
      //Increase space velocity and rock force(force applyed to hurt mother nave)
      spaceVelocity += 1;
      rockForce += 1;
      //destroy meteor
      rocks.destroyEach();
      //make a sound
      explosionSound.setVolume(0.1);
      explosionSound.play();
      //increase score
      score += Math.round(0.5 * spaceVelocity)*(0.5 *hp);
    }
  }  
    //if NOT--something is in plusPowerUpGroup, then:
  if (plusPowerUpGroup[0] !== undefined) {
    //if plus power up group is touching light group(or the opposite-is the same thing), then:
    if (lightRayGroup.isTouching(plusPowerUpGroup)) {
      //Destroy power up
      plusPowerUpGroup.destroyEach();
      //make a sound
      explosionSound.setVolume(0.1);
      explosionSound.play();
    }
  }
  //Don't make space velocity be negative or may zero
  if (spaceVelocity < 1) {
    spaceVelocity = 1;
  }
  //if meteor group is touching mother nave sprite(or the opposite-is the same thing), then:
  if (rocks.isTouching(collisionNaveSprite)) {
    //hurt nave
    hurtNave(rockForce);
  }
  //if plus power up group is touching mother nave sprite(or the opposite-is the same thing), then:
  if (plusPowerUpGroup.isTouching(collisionNaveSprite)) {
    //destroy power up
    plusPowerUpGroup.destroyEach();
    //increase hp to 100
    hp = 100;
  }
  //Don't make score be negative
  if(score < 0){
    score = 0;
  }
}
//hurt nave(parameter takes meteor force, following the phisics logic-force=mass*velocity)
function hurtNave(rockForce) {
  //decrease hp with the parameter
  hp -= rockForce;
  //decrease space velocity
  spaceVelocity -= 1;
  //don't let space velocity be 0
  if (!(spaceVelocity === 1)) {
    rockForce -= 1;
  }
  //destroy meteors
  rocks.destroyEach();
  //decrease score
  score -= 100;
  //explode hardly
  explosionSound.setVolume(3);
  explosionSound.play();
}
//GameOver
function gameOver() {
  //gameIsOver is true
  gameIsOver = true;
  //hp gonna be 0(to don't be negative)
  hp = 0;
  //shooter and mother nave will disapear
  shooter.visible = false;
  motherNave.visible = false;
  //stop music
  song2.setVolume(0);
  song1.setVolume(0);
  //GameState gonna be a fail
  GameState = lose;
  //Rank
  if (score >= Begginer && score < Advanced) {
    rank = "Begginer";
  }
  else if (score >= Advanced && score < Profesional) {
    rank = "Advanced";
  }
  else if (score >= Profesional && score < Expert) {
    rank = "Pro";
  }
  else if (score >= Expert && score < Master) {
    rank = "Expert";
  }
  else if (score >= Master && score < GodLike) {
    rank = "Master";
  }
  else if (score >= GodLike) {
    rank = "GodLike";
  }
}
//Verify if the number is fracionary(tutorial in youtube)
function isFloat(n) {
  if (!isNaN(n)) {
    if (parseInt(n) != parseFloat(n)) {
      return true;
    }
  }
  return false;
}