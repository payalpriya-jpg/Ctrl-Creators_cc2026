// =====================================================
// JALEBI STACK GAME
// =====================================================

let x = 100;

let dir = 1;

function setup() {

  createCanvas(800, 600);
}

function draw() {

  background(255, 228, 180);

   drawPlate();

  x += 6 * dir;

  if (x > 690) {

    dir = -1;
  }

  if (x < 110) {

    dir = 1;
  }

  drawJalebi(x, 120, 220);
}

function drawPlate() {

  fill(230);

  ellipse(width / 2, 540, 420, 70);

  fill(245);

  ellipse(width / 2, 530, 380, 45);
}

function drawJalebi(x, y, w) {

  noFill();

  stroke(255, 140, 0);

  strokeWeight(8);

  ellipse(x, y, w, 45);

  ellipse(x, y, w * 0.45, 20);

  stroke(255, 220, 120, 150);

  arc(
    x,
    y,
    w * 0.8,
    30,
    PI,
    TWO_PI
  );

  noStroke();
}