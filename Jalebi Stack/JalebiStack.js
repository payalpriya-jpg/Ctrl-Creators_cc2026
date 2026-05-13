// =====================================================
// JALEBI STACK GAME
// =====================================================

let pieces = [];

let gameOver = false;

let x = 100;

let y = 120;

let dir = 1;

let score = 0;

let winLine = 100;

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

  for (let p of pieces) {
    drawJalebi(p.x, p.y, p.w);
  }
}

stroke(255, 0, 0);

strokeWeight(4);

line(0, winLine, width, winLine);

noStroke();

if (top.y <= winLine + 30) {

  textSize(60);

  fill(0, 255, 0);

  text(
    "YOU WIN!",
    width / 2,
    height / 2
  );

  noLoop();
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
if (pieces.length > 0) {

  let top = pieces[pieces.length - 1];

  let overlap =
    min(x + 110, top.x + top.w / 2)
    -
    max(x - 110, top.x - top.w / 2);

  if (overlap <= 0) {

    noLoop();
  }

  pieces.push({
  x: x,
  y: top.y - 40,
  w: overlap
});

} else {

  pieces.push({
    x: x,
    y: 500,
    w: 220
  });
}

if (abs(x - top.x) < 8) {

  score += 10;

} else {

  score += 5;
}

fill(0);

textSize(28);

text("Score: " + score, 20, 40);

if (abs(x - top.x) < 8) {

  score += 10;

} else {

  score += 5;
}

fill(0);

textSize(28);

text("Score: " + score, 20, 40);

if (overlap <= 0 || overlap < 25) {

  gameOver = true;
}

if (gameOver) {

  background(0);

  fill(255, 0, 0);

  textAlign(CENTER);

  textSize(60);

  text(
    "GAME OVER",
    width / 2,
    height / 2
  );

  noLoop();
}