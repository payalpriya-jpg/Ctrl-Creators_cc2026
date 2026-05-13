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