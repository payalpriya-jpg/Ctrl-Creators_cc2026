// =====================================================
// REALISTIC JALEBI STACK GAME
// =====================================================

let pieces = [];

let currentPiece;

let moveSpeed = 6;

let gameOver = false;
let win = false;

let score = 0;

// Leaderboard
let leaderboard = [];

// Plate
let plateY = 540;

// Win line
let winLine = 100;

function setup() {

  createCanvas(800, 600);

  rectMode(CENTER);

  loadLeaderboard();

  resetPiece();
}

function draw() {

  drawSweetShopBackground();

  // Win line
  stroke(255, 0, 0);
  strokeWeight(4);

  line(0, winLine, width, winLine);

  noStroke();

  fill(255, 0, 0);

  textSize(22);

  text(
    "WIN LINE",
    width - 120,
    winLine - 10
  );

  // Plate
  drawPlate();

  // Leaderboard
  drawLeaderboard();

  // WIN SCREEN
  if (win) {

    saveScore();

    fill(0, 180);

    rect(width / 2, height / 2, width, height);

    fill(0, 255, 120);

    textAlign(CENTER);

    textSize(60);

    text(
      "YOU WIN!",
      width / 2,
      height / 2 - 40
    );

    fill(255);

    textSize(32);

    text(
      "Final Score: " + score,
      width / 2,
      height / 2 + 20
    );

    textSize(22);

    text(
      "Refresh to Play Again",
      width / 2,
      height / 2 + 70
    );

    noLoop();

    return;
  }

  // GAME OVER
  if (gameOver) {

    saveScore();

    fill(0, 180);

    rect(width / 2, height / 2, width, height);

    fill(255, 0, 0);

    textAlign(CENTER);

    textSize(60);

    text(
      "GAME OVER",
      width / 2,
      height / 2 - 40
    );

    fill(255);

    textSize(32);

    text(
      "Final Score: " + score,
      width / 2,
      height / 2 + 20
    );

    textSize(22);

    text(
      "Refresh to Play Again",
      width / 2,
      height / 2 + 70
    );

    noLoop();

    return;
  }

  // Draw placed jalebis
  for (let p of pieces) {

    drawJalebi(
      p.x,
      p.y,
      p.w
    );
  }

  // Update current piece
  updateCurrentPiece();

  // Draw active piece
  drawJalebi(
    currentPiece.x,
    currentPiece.y,
    currentPiece.w
  );

  // UI
  fill(0);

  textAlign(LEFT);

  textSize(28);

  text("Score: " + score, 20, 40);

  textSize(18);

  text(
    "Press SPACEBAR to Drop",
    20,
    75
  );
}

// =====================================================
// UPDATE CURRENT PIECE
// =====================================================
function updateCurrentPiece() {

  // Horizontal movement
  if (!currentPiece.dropping) {

    currentPiece.x +=
      moveSpeed * currentPiece.dir;

    // Bounce
    if (
      currentPiece.x >
      width - currentPiece.w / 2
    ) {

      currentPiece.dir = -1;
    }

    if (
      currentPiece.x <
      currentPiece.w / 2
    ) {

      currentPiece.dir = 1;
    }
  }

  // Falling
  else {

    currentPiece.y += 10;

    // FIRST PIECE
    if (
      pieces.length === 0 &&
      currentPiece.y >= 500
    ) {

      currentPiece.y = 500;

      pieces.push({
        x: currentPiece.x,
        y: currentPiece.y,
        w: currentPiece.w
      });

      score += 10;

      resetPiece();
    }

    // STACK COLLISION
    else if (pieces.length > 0) {

      let top =
        pieces[pieces.length - 1];

      if (
        currentPiece.y >= top.y - 40
      ) {

        stackPiece(top);
      }
    }
  }
}

// =====================================================
// STACKING LOGIC
// =====================================================
function stackPiece(top) {

  let overlap =
    min(
      currentPiece.x + currentPiece.w / 2,
      top.x + top.w / 2
    ) -
    max(
      currentPiece.x - currentPiece.w / 2,
      top.x - top.w / 2
    );

  // Completely missed
  if (overlap <= 0) {

    gameOver = true;

    return;
  }

  // Perfect
  if (
    abs(currentPiece.x - top.x) < 8
  ) {

    score += 10;

    currentPiece.x = top.x;
  }

  // Imperfect
  else {

    score += 5;
  }

  // Shrink piece
  currentPiece.w = overlap;

  // Too small
  if (currentPiece.w < 25) {

    gameOver = true;

    return;
  }

  // Place piece
  currentPiece.y = top.y - 40;

  pieces.push({
    x: currentPiece.x,
    y: currentPiece.y,
    w: currentPiece.w
  });

  // Win check
  if (
    currentPiece.y <= winLine + 30
  ) {

    win = true;
  }

  // Increase difficulty
  moveSpeed += 0.25;

  resetPiece(currentPiece.w);
}

// =====================================================
// RESET PIECE
// =====================================================
function resetPiece(w = 220) {

  currentPiece = {

    x: 100,
    y: 80,

    w: w,

    dir: 1,

    dropping: false
  };
}

// =====================================================
// DRAW JALEBI
// =====================================================
function drawJalebi(x, y, w) {

  noFill();

  stroke(255, 140, 0);

  strokeWeight(8);

  // Outer spiral
  ellipse(x, y, w, 45);

  // Inner spiral
  ellipse(x, y, w * 0.45, 20);

  // Shine
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

// =====================================================
// DRAW PLATE
// =====================================================
function drawPlate() {

  fill(230);

  ellipse(
    width / 2,
    plateY,
    420,
    70
  );

  fill(245);

  ellipse(
    width / 2,
    plateY - 10,
    380,
    45
  );
}

// =====================================================
// SWEET SHOP BACKGROUND
// =====================================================
function drawSweetShopBackground() {

  background(255, 228, 180);

  noStroke();

  // Shelves
  for (let i = 0; i < 6; i++) {

    fill(180, 120, 70, 90);

    rect(
      width / 2,
      80 + i * 70,
      700,
      18,
      10
    );
  }

  // Sweet jars
  for (let i = 0; i < 10; i++) {

    fill(
      255,
      random(150, 220),
      0,
      70
    );

    ellipse(
      100 + i * 70,
      70,
      40,
      40
    );
  }

  // Blur overlay
  fill(255, 255, 255, 25);

  rect(
    width / 2,
    height / 2,
    width,
    height
  );
}

// =====================================================
// LEADERBOARD
// =====================================================
function loadLeaderboard() {

  let data =
    localStorage.getItem(
      "jalebiLeaderboard"
    );

  if (data) {

    leaderboard = JSON.parse(data);
  }
}

function saveScore() {

  if (!leaderboard.includes(score)) {

    leaderboard.push(score);

    leaderboard.sort(
      (a, b) => b - a
    );

    leaderboard =
      leaderboard.slice(0, 5);

    localStorage.setItem(
      "jalebiLeaderboard",
      JSON.stringify(leaderboard)
    );
  }
}

function drawLeaderboard() {

  fill(0, 120);

  rect(690, 170, 180, 180, 15);

  fill(255);

  textAlign(CENTER);

  textSize(24);

  text("Leaderboard", 690, 110);

  textSize(20);

  for (
    let i = 0;
    i < leaderboard.length;
    i++
  ) {

    text(
      (i + 1) +
      ". " +
      leaderboard[i],

      690,
      145 + i * 28
    );
  }
}

// =====================================================
// CONTROLS
// =====================================================
function keyPressed() {

  // SPACEBAR
  if (
    keyCode === 32 &&
    !currentPiece.dropping
  ) {

    currentPiece.dropping = true;
  }

  return false;
}