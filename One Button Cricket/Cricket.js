let batsmanX;

function setup() {

  createCanvas(
    windowWidth,
    windowHeight
  );

  rectMode(CENTER);

  textAlign(CENTER);

  batsmanX = width * 0.42;
}

function draw() {

  background(120, 200, 255);

  fill(50, 180, 70);

  rect(
    width / 2,
    height - 80,
    width,
    320
  );
}

function drawSky() {

  background(120, 200, 255);

  fill(255, 220, 0);

  ellipse(
    width - 120,
    100,
    90
  );
}

function drawGround() {

  fill(50, 180, 70);

  rect(
    width / 2,
    height - 80,
    width,
    320
  );

  stroke(255);

  strokeWeight(4);

  arc(
    width / 2,
    height - 20,
    width * 0.9,
    220,
    PI,
    TWO_PI
  );

  noStroke();
}

function drawPitch() {

  let pitchTop = 170;

  let pitchBottom = height - 150;

  let pitchHeight =
    pitchBottom - pitchTop;

  fill(215, 185, 125);

  rect(
    width / 2,
    (pitchTop + pitchBottom) / 2,

    width * 0.16,

    pitchHeight,
    25
  );
}

function drawBatsman() {

  push();

  translate(
    batsmanX,
    height - 250
  );

  stroke(255);

  strokeWeight(10);

  line(-12, 40, -18, 110);

  line(12, 40, 18, 110);

  line(-22, -5, 20, 5);

  noStroke();

  fill(20, 90, 255);

  rect(0, 0, 55, 80, 15);

  fill(255, 220, 180);

  ellipse(0, -55, 45);

  fill(180, 140, 90);

  rect(40, 30, 20, 100, 8);

  pop();
}