var campo, campoImg;
var player1, player2;

var gol, gol2;

var ball, ballImg;
var player1Img, player2Img;

var score = 0;
var gameState = "Play";

var invisibleGround1, invisibleGround2, invisibleGround3, invisibleGround4;

var lose, winning;

function preload() {
  campoImg = loadImage("assets/campo.png");

  ballImg = loadImage("assets/bola.png");

  player1Img = loadImage("assets/botao1.png");
  player2Img = loadImage("assets/botao2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //adicionando a imagem de fundo
  campo = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20);
  campo.addImage(campoImg);
  campo.scale = 1.53;

  invisibleGround1 = createSprite(
    displayWidth / 2 - 20,
    displayHeight / 2 - 400,
    width,
    20
  );
  invisibleGround2 = createSprite(
    displayWidth / 2 - 750,
    displayHeight / 2 - 100,
    10,
    800
  );
  invisibleGround3 = createSprite(
    displayWidth / 2 - 20,
    displayHeight - 140,
    width,
    20
  );
  invisibleGround4 = createSprite(
    displayWidth - 70,
    displayHeight / 2 - 100,
    10,
    970
  );
  invisibleGround1.visible = false;
  invisibleGround2.visible = false;
  invisibleGround3.visible = false;
  invisibleGround4.visible = false;

  //criando o sprite do jogador
  player1 = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player1.addImage(player1Img);
  player1.scale = 0.2;
  player1.debug = true;
  player1.setCollider("rectangle", 0, 0, 300, 300);

  player2 = createSprite(displayWidth - 430, displayHeight - 300, 50, 50);
  player2.addImage(player2Img);
  player2.scale = 0.2;
  player2.debug = true;
  player2.setCollider("rectangle", 0, 0, 300, 300);

  gol = createSprite(displayWidth - 110, displayHeight - 470, 30, 360);
  gol.scale = 0.3;
  gol.debug = true;
  gol.setCollider("rectangle", 0, 0, 300, 300);
  gol.visible = true;
  gol.shapeColor = "white";

  gol2 = createSprite(displayWidth - 1457, displayHeight - 470, 30, 360);
  gol2.scale = 0.3;
  gol2.debug = true;
  gol2.setCollider("rectangle", 0, 0, 300, 300);
  gol2.visible = true;
  gol2.shapeColor = "white";

  ball = createSprite(displayWidth - 785, displayHeight - 464, 50, 50);
  ball.addImage(ballImg);
  ball.scale = 0.1;
  ball.debug = true;
  ball.setCollider("rectangle", 0, 0, 300, 300);
}

function draw() {
  background(0);

  if (keyDown("UP_ARROW") || touches.length > 0) {
    player1.y = player1.y - 30;
    player2.velocityY = -5;
  }
  if (keyDown("DOWN_ARROW") || touches.length > 0) {
    player1.y = player1.y + 30;
  }
  if (keyDown("RIGHT_ARROW") || touches.length > 0) {
    player1.x = player1.x + 30;
  }
  if (keyDown("LEFT_ARROW") || touches.length > 0) {
    player1.x = player1.x - 30;
  }

  if (player1.isTouching(ball)) {
    ball.x = ball.x + 30;
  }
  if (player2.isTouching(ball)) {
    ball.x = ball.x - 30;
  }

  if (player1.isTouching(player2)) {
    player2.x = player2.x - 30;
    player2.velocityX -= 3;
  }
  if (player1.isTouching(player2)) {
    player2.y = player2.y - 30;
    player2.velocityY += 3;
  }

  scoreGoal();
  player2Move();
  drawSprites();
  fill("white");
  textSize(20);
  text("Pontuação: " + score, displayWidth - 300, displayHeight - 800);
}
function player2Move() {
  if (player1.isTouching(player2)) {
    player1.y = player2.y;
  }
  if (player2.collide(invisibleGround1)) {
    player2.velocityX += 10;
    player2.velocityY += 10;
  }
  if (player2.collide(invisibleGround2)) {
    player2.velocityY += 10;
    player2.velocityX += 10;
  }
  if (player2.collide(invisibleGround3)) {
    player2.velocityY -= 10;
    player2.velocityX -= 10;
  }
  if (player2.collide(invisibleGround4)) {
    player2.velocityX -= 10;
    player2.velocityY -= 10;
  }
}
function scoreGoal() {
  if (ball.isTouching(gol)) {
    score = score + 1;
  }
  if (ball.collide(gol)) {
    ball.x = displayWidth / 2 + 5;
    ball.y = displayHeight / 2 - 45;
  }
}
