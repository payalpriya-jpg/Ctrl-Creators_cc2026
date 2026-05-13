// =====================================================
// JALEBI STACK GAME
// =====================================================

let pieces = [];

let x = 100;

let y = 120;

let dir = 1;

let dropping = false;

function setup() {

  createCanvas(800, 600);
}

function draw() {

  background(255, 228, 180);

   drawPlate();

// Horizontal movement
if (!dropping) {
  x += 6 * dir;

  if (x > 690) {

    dir = -1;
  }

  if (x < 110) {

    dir = 1;
  }

// Falling
else {

  y += 10;

  if (y >= 500) {

    pieces.push({
      x: x,
      y: 500,
      w: 220
    });

    x = 100;
    y = 120;

    dropping = false;
  }
}

  drawJalebi(x, y, 220);
}

function keyPressed() {

  if (keyCode === 32) {

    dropping = true;
  }
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

  noStroke();
}

for (let p of pieces) {

  drawJalebi(p.x, p.y, p.w);
}