// =====================================================
// JALEBI STACK GAME
// =====================================================

let pieces = [];

let currentPiece;

let moveSpeed = 5;

let gameOver = false;
let win = false;

let score = 0;

let leaderboard = [];

// responsive values
let plateY;
let winLine;

function setup() {

  createCanvas(windowWidth, windowHeight);

  frameRate(90);

  rectMode(CENTER);

  calculateResponsiveValues();

  loadLeaderboard();

  resetPiece();
}

function draw() {

  drawSweetShopBackground();

  // WIN LINE
  stroke(255, 0, 0);

  strokeWeight(4);

  line(0, winLine, width, winLine);

  noStroke();

  fill(255, 0, 0);

  textSize(width * 0.02);

  text(
    "WIN LINE",
    width - width * 0.15,
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

    textSize(width * 0.07);

    text(
      "YOU WIN!",
      width / 2,
      height / 2 - 40
    );

    fill(255);

    textSize(width * 0.035);

    text(
      "Final Score: " + score,
      width / 2,
      height / 2 + 20
    );

    textSize(width * 0.025);

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

    textSize(width * 0.07);

    text(
      "GAME OVER",
      width / 2,
      height / 2 - 40
    );

    fill(255);

    textSize(width * 0.035);

    text(
      "Final Score: " + score,
      width / 2,
      height / 2 + 20
    );

    textSize(width * 0.025);

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

  // Update piece
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

  textSize(width * 0.03);

  text(
    "Score: " + score,
    20,
    40
  );

  textSize(width * 0.018);

  text(
    "Press SPACEBAR to Drop",
    20,
    75
  );
}

// =====================================================
// RESPONSIVE VALUES
// =====================================================

function calculateResponsiveValues() {

  plateY = height * 0.9;

  winLine = height * 0.15;
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

    currentPiece.y += 14;

    // FIRST PIECE
    if (
      pieces.length === 0 &&
      currentPiece.y >= height * 0.83
    ) {

      currentPiece.y = height * 0.83;

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
        currentPiece.y >= top.y - height * 0.065
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

  // Missed
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

  // Shrink
  currentPiece.w = overlap;

  // Too small
  if (currentPiece.w < width * 0.03) {

    gameOver = true;

    return;
  }

  // Place piece
  currentPiece.y =
    top.y - height * 0.065;

  pieces.push({
    x: currentPiece.x,
    y: currentPiece.y,
    w: currentPiece.w
  });

  // Win
  if (
    currentPiece.y <= winLine + 30
  ) {

    win = true;
  }

  // Increase difficulty
  moveSpeed += 0.3;

  resetPiece(currentPiece.w);
}

// =====================================================
// RESET PIECE
// =====================================================

function resetPiece(
  w = width * 0.28
) {

  currentPiece = {

    x: width * 0.1,

    y: height * 0.12,

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

  ellipse(x, y, w, height * 0.07);

  ellipse(
    x,
    y,
    w * 0.45,
    height * 0.03
  );

  // shine
  stroke(255, 220, 120, 150);

  arc(
    x,
    y,
    w * 0.8,
    height * 0.05,
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
    width * 0.5,
    height * 0.11
  );

  fill(245);

  ellipse(
    width / 2,
    plateY - 10,
    width * 0.45,
    height * 0.07
  );
}

// =====================================================
// SWEET SHOP BACKGROUND
// =====================================================

function drawSweetShopBackground() {

  background(255, 228, 180);

  noStroke();

  // shelves
  for (let i = 0; i < 6; i++) {

    fill(180, 120, 70, 90);

    rect(
      width / 2,
      80 + i * (height * 0.12),
      width * 0.8,
      18,
      10
    );
  }

  // jars
  for (let i = 0; i < 10; i++) {

    fill(
      255,
      random(150, 220),
      0,
      70
    );

    ellipse(
      width * 0.12 + i * (width * 0.08),
      70,
      width * 0.05,
      width * 0.05
    );
  }

  // blur overlay
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

  rect(
    width - width * 0.12,
    height * 0.28,
    width * 0.22,
    height * 0.28,
    15
  );

  fill(255);

  textAlign(CENTER);

  textSize(width * 0.025);

  text(
    "Leaderboard",
    width - width * 0.12,
    height * 0.18
  );

  textSize(width * 0.022);

  for (
    let i = 0;
    i < leaderboard.length;
    i++
  ) {

    text(
      (i + 1) +
      ". " +
      leaderboard[i],

      width - width * 0.12,

      height * 0.24 + i * 30
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

// =====================================================
// RESIZE FUNCTION
// =====================================================

function windowResized() {

  resizeCanvas(
    windowWidth,
    windowHeight
  );

  calculateResponsiveValues();
}