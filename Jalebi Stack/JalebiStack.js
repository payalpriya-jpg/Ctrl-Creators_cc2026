// =====================================================
// ONE BUTTON CRICKET - FINAL HACKATHON VERSION
// P5.JS
// =====================================================

// ================= VARIABLES =================

let batsmanX;

let ball;

let score = 0;

let highScore = 0;

let gameOver = false;

// bat animation
let swing = false;
let batAngle = 0;

// hit effect
let hitEffect = false;
let hitTimer = 0;

// flying ball
let ballHit = false;
let hitVX = 0;
let hitVY = 0;

// particles
let particles = [];

// FOUR / SIX popup
let shotText = "";

let shotTimer = 0;

// wicket
let stumpHit = false;

// crowd
let crowdOffset = 0;

// camera shake
let shakeAmount = 0;

// difficulty
let difficulty = 0;

// =====================================================
// SETUP
// =====================================================

function setup() {

  createCanvas(
    windowWidth,
    windowHeight
  );

  rectMode(CENTER);

  textAlign(CENTER);

  batsmanX = width * 0.42;

  resetBall();

  // load high score
  let saved =
    localStorage.getItem(
      "cricketHighScore"
    );

  if (saved != null) {

    highScore = int(saved);
  }
}

// =====================================================
// DRAW
// =====================================================

function draw() {

  push();

  // camera shake
  translate(
    random(-shakeAmount, shakeAmount),
    random(-shakeAmount, shakeAmount)
  );

  shakeAmount *= 0.9;

  drawSky();

  drawCrowd();

  drawGround();

  drawPitch();

  drawStumps();

  drawBatsman();

  drawBall();

  drawParticles();

  drawScore();

  drawShotText();

  if (!gameOver) {

    updateBall();

    updateBat();

    checkMiss();
  }

  else {

    showGameOver();
  }

  pop();
}

// =====================================================
// SKY
// =====================================================

function drawSky() {

  background(120, 200, 255);

  // sun
  fill(255, 220, 0);

  ellipse(
    width - 120,
    100,
    90
  );
}

// =====================================================
// CROWD
// =====================================================

function drawCrowd() {

  crowdOffset += 0.03;

  for (let y = 0; y < 120; y += 20) {

    for (let x = 0; x < width; x += 20) {

      let r =
        120 +
        sin(crowdOffset + x * 0.02) * 50;

      let g =
        100 +
        sin(crowdOffset + y * 0.03) * 50;

      let b =
        150 +
        sin(crowdOffset + x * 0.01) * 50;

      fill(r, g, b);

      ellipse(
        x,
        y,
        10
      );
    }
  }
}

// =====================================================
// GROUND
// =====================================================

function drawGround() {

  fill(50, 180, 70);

  rect(
    width / 2,
    height - 80,
    width,
    320
  );

  // boundary line
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

  // stadium lights
  fill(255, 255, 180, 120);

  ellipse(120, 90, 90);

  ellipse(width - 120, 90, 90);
}

// =====================================================
// PITCH
// =====================================================

function drawPitch() {

  let pitchTop = 170;

  let pitchBottom = height - 150;

  let pitchHeight =
    pitchBottom - pitchTop;

  // shadow
  fill(120, 90, 50, 70);

  rect(
    width / 2 + 8,
    (pitchTop + pitchBottom) / 2,

    width * 0.16,

    pitchHeight,
    25
  );

  // main pitch
  fill(215, 185, 125);

  rect(
    width / 2,
    (pitchTop + pitchBottom) / 2,

    width * 0.16,

    pitchHeight,
    25
  );

  // crease lines
  stroke(255);

  strokeWeight(4);

  // batting crease
  line(
    width / 2 - 60,
    height - 190,

    width / 2 + 60,
    height - 190
  );

  // bowling crease
  line(
    width / 2 - 60,
    170,

    width / 2 + 60,
    170
  );

  // side lines
  line(
    width / 2 - 40,
    pitchTop,

    width / 2 - 40,
    pitchBottom
  );

  line(
    width / 2 + 40,
    pitchTop,

    width / 2 + 40,
    pitchBottom
  );

  noStroke();
}

// =====================================================
// STUMPS
// =====================================================

function drawStumps() {

  fill(255);

  // batsman stumps
  if (stumpHit) {

    push();

    translate(
      batsmanX + 80,
      height - 180
    );

    rotate(radians(70));

    rect(-18, 0, 6, 50);

    rect(0, 0, 6, 50);

    rect(18, 0, 6, 50);

    pop();
  }

  else {

    rect(
      batsmanX + 70,
      height - 180,
      6,
      50
    );

    rect(
      batsmanX + 85,
      height - 180,
      6,
      50
    );

    rect(
      batsmanX + 100,
      height - 180,
      6,
      50
    );
  }

  // bowler stumps
  rect(
    width / 2 - 15,
    140,
    6,
    50
  );

  rect(
    width / 2,
    140,
    6,
    50
  );

  rect(
    width / 2 + 15,
    140,
    6,
    50
  );
}

// =====================================================
// BATSMAN
// =====================================================

function drawBatsman() {

  push();

  translate(
    batsmanX,
    height - 250
  );

  // shadow
  fill(0, 50);

  ellipse(0, 120, 70, 20);

  // legs
  stroke(255);

  strokeWeight(10);

  line(-12, 40, -18, 110);

  line(12, 40, 18, 110);

  // arms
  line(-22, -5, 20, 5);

  noStroke();

  // jersey
  fill(20, 90, 255);

  rect(0, 0, 55, 80, 15);

  // neck
  fill(255, 220, 180);

  rect(0, -35, 12, 12);

  // head
  ellipse(0, -55, 45);

  // helmet
  fill(25);

  arc(
    0,
    -60,
    50,
    45,
    PI,
    TWO_PI
  );

  // helmet grill
  stroke(180);

  strokeWeight(2);

  line(10, -55, 18, -40);

  line(5, -55, 13, -38);

  noStroke();

  // ================= BAT =================

  push();

  translate(42, 8);

  rotate(radians(batAngle));

  // handle grip
  fill(60, 120, 255);

  rect(0, -45, 12, 35, 5);

  // handle wood
  fill(180, 140, 90);

  rect(0, -15, 10, 35, 5);

  // main bat body
  fill(230, 200, 140);

  rect(0, 35, 28, 90, 8);

  // bat edges
  fill(200, 170, 120);

  rect(-10, 35, 5, 85, 5);

  rect(10, 35, 5, 85, 5);

  // sticker
  fill(255, 60, 60);

  rect(0, 30, 14, 28, 4);

  fill(255);

  rect(0, 5, 10, 18, 3);

  pop();

  pop();
}

// =====================================================
// BALL
// =====================================================

function drawBall() {

  if (hitEffect) {

    fill(255, 220, 100, 120);

    ellipse(
      ball.x,
      ball.y,
      50
    );
  }

  fill(220, 0, 0);

  ellipse(
    ball.x,
    ball.y,
    22
  );

  fill(255);

  ellipse(
    ball.x - 4,
    ball.y - 4,
    5
  );
}

// =====================================================
// UPDATE BALL
// =====================================================

function updateBall() {

  if (!ballHit) {

    ball.y += ball.speed;

    ball.x += ball.swing;

    if (
      ball.y >
      height * 0.6
    ) {

      ball.speed *= 0.98;
    }
  }

  else {

    ball.x += hitVX;

    ball.y += hitVY;

    hitVY += 0.25;

    if (
      ball.y < -100 ||
      ball.x < -100 ||
      ball.x > width + 100
    ) {

      resetBall();

      ballHit = false;
    }
  }

  if (hitEffect) {

    hitTimer--;

    if (hitTimer <= 0) {

      hitEffect = false;
    }
  }
}

// =====================================================
// RESET BALL
// =====================================================

function resetBall() {

  ball = {

    x:
      width / 2 +
      random(-25, 25),

    y: 140,

    speed:
      random(4, 5) +
      difficulty,

    swing:
      random(-0.5, 0.5)
  };
}

// =====================================================
// BAT ANIMATION
// =====================================================

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

// =====================================================
// HIT BALL
// =====================================================

function hitBall() {

  let d = dist(

    ball.x,
    ball.y,

    batsmanX + 35,
    height - 230
  );

  if (
    d < 75 &&
    ball.y > height - 320
  ) {

    let runType;

    // SIX
    if (d < 35) {

      runType = 6;

      hitVX = random(-4, 4);

      hitVY = random(-20, -17);

      shakeAmount = 10;
    }

    // FOUR
    else {

      runType = 4;

      hitVX = random(-7, 7);

      hitVY = random(-15, -12);

      shakeAmount = 5;
    }

    score += runType;

    shotText = runType;

    shotTimer = 45;

    hitEffect = true;

    hitTimer = 10;

    ballHit = true;

    createHitParticles();

    difficulty += 0.03;
  }
}

// =====================================================
// MISS CHECK
// =====================================================

function checkMiss() {

  if (
    !ballHit &&
    ball.y > height - 160
  ) {

    gameOver = true;

    stumpHit = true;

    if (score > highScore) {

      highScore = score;

      localStorage.setItem(
        "cricketHighScore",
        highScore
      );
    }
  }
}

// =====================================================
// PARTICLES
// =====================================================

function createHitParticles() {

  for (let i = 0; i < 25; i++) {

    particles.push({

      x: ball.x,

      y: ball.y,

      vx: random(-6, 6),

      vy: random(-6, 6),

      life: 255
    });
  }
}

function drawParticles() {

  for (
    let i = particles.length - 1;
    i >= 0;
    i--
  ) {

    let p = particles[i];

    fill(
      255,
      220,
      120,
      p.life
    );

    ellipse(
      p.x,
      p.y,
      8
    );

    p.x += p.vx;

    p.y += p.vy;

    p.life -= 8;

    if (p.life <= 0) {

      particles.splice(i, 1);
    }
  }
}

// =====================================================
// SCOREBOARD
// =====================================================

function drawScore() {

  fill(0, 160);

  rect(
    width - 120,
    80,
    180,
    120,
    15
  );

  fill(255);

  textSize(20);

  text(
    "SCORE",
    width - 120,
    50
  );

  textSize(34);

  text(
    score,
    width - 120,
    90
  );

  fill(255, 220, 0);

  textSize(18);

  text(
    "HIGH SCORE",
    width - 120,
    125
  );

  textSize(24);

  text(
    highScore,
    width - 120,
    155
  );
}

// =====================================================
// FOUR / SIX TEXT
// =====================================================

function drawShotText() {

  if (shotTimer > 0) {

    if (shotText == 6) {

      fill(255, 215, 0);
    }

    else {

      fill(0, 220, 255);
    }

    textSize(120);

    text(
      shotText,
      width / 2,
      height / 2
    );

    shotTimer--;
  }
}

// =====================================================
// GAME OVER
// =====================================================

function showGameOver() {

  fill(0, 180);

  rect(
    width / 2,
    height / 2,
    width,
    height
  );

  fill(255, 0, 0);

  textSize(90);

  text(
    "OUT!",
    width / 2,
    height / 2 - 40
  );

  fill(255);

  textSize(30);

  text(
    "Press R to Restart",
    width / 2,
    height / 2 + 40
  );
}

// =====================================================
// CONTROLS
// =====================================================

function keyPressed() {

  // SPACEBAR
  if (
    keyCode === 32 &&
    !gameOver
  ) {

    swing = true;

    hitBall();
  }

  // RESTART
  if (
    (key === 'r' ||
    key === 'R') &&
    gameOver
  ) {

    restartGame();
  }

  return false;
}

// =====================================================
// RESTART
// =====================================================

function restartGame() {

  score = 0;

  difficulty = 0;

  gameOver = false;

  batAngle = 0;

  particles = [];

  stumpHit = false;

  ballHit = false;

  resetBall();
}

// =====================================================
// RESPONSIVE RESIZE
// =====================================================

function windowResized() {

  resizeCanvas(
    windowWidth,
    windowHeight
  );

  batsmanX = width * 0.42;
}