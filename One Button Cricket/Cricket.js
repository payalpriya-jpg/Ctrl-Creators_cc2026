let batsmanX;

let ball;

let swing = false;

let batAngle = 0;

function setup() {

  createCanvas(
    windowWidth,
    windowHeight
  );

  rectMode(CENTER);

  textAlign(CENTER);

  batsmanX = width * 0.42;

  resetBall();
}

function draw() {

  drawSky();

  drawGround();

  drawPitch();

  drawBatsman();

  drawBall();

  updateBall();
}

function resetBall() {

  ball = {

    x: width / 2,

    y: 140,

    speed: 5
  };
}

function updateBall() {

  ball.y += ball.speed;

  if (ball.y > height) {

    resetBall();
  }
}

function drawBall() {

  fill(220, 0, 0);

  ellipse(
    ball.x,
    ball.y,
    22
  );
}

function drawSky() {

  background(120, 200, 255);
}

function drawGround() {

  fill(50, 180, 70);

  rect(
    width / 2,
    height - 80,
    width,
    320
  );
}

function drawPitch() {

  fill(215, 185, 125);

  rect(
    width / 2,
    height / 2 + 50,
    width * 0.16,
    height * 0.6,
    25
  );
}

function drawBatsman() {

  push();

  translate(
    batsmanX,
    height - 250
  );

  fill(20, 90, 255);

  rect(0, 0, 55, 80, 15);

  fill(255, 220, 180);

  ellipse(0, -55, 45);

  fill(180, 140, 90);

  rect(40, 30, 20, 100, 8);

  pop();
}

function updateBat() {

  if (swing) {

    batAngle -= 15;

    if (batAngle < -95) {

      swing = false;
    }
  }

  else {

    batAngle *= 0.8;
  }
}

updateBat();

function keyPressed() {

  if (keyCode === 32) {

    swing = true;
  }
}