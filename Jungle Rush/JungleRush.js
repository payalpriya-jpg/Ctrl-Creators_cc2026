let laneWidth;
let lanes = [];

let playerLane = 1;
let horseX;

let animals = [];
let diamonds = [];

let gameOver = false;

let score = 0;
let highScore = 0;

let roadLineOffset = 0;

let gameSpeed = 4;

// Sound effects
let backgroundMusic;
let collectSound;
let crashSound;
let gameOverSound;
let audioUnlocked = false;
let gameOverSoundPlayed = false;

function preload() {
  soundFormats('mp3');
  backgroundMusic = loadSound('../assets/jungle\ loop.mp3');
  collectSound = loadSound('../assets/coin\ collect.mp3');
  crashSound = loadSound('../assets/crash.mp3');
  gameOverSound = loadSound('../assets/game\ over.mp3');
}

function setup() {
  if (backgroundMusic) {
    backgroundMusic.setVolume(0.1);
    backgroundMusic.loop();
  }


  createCanvas(windowWidth, windowHeight);

  laneWidth = width / 3;

  lanes = [
    laneWidth / 2,
    laneWidth + laneWidth / 2,
    2 * laneWidth + laneWidth / 2
  ];

  horseX = lanes[playerLane];

  rectMode(CENTER);

  let savedScore = localStorage.getItem("highScore");

  if (savedScore != null) {

    highScore = int(savedScore);
  }
}

function draw() {

  background(30, 120, 60);

  if (!gameOver) {

    roadLineOffset += 8;

    score += 0.03;

    // increase speed after score 60
    if (score > 60) {

      gameSpeed += 0.0008;
    }
  }

  drawJungle();

  drawRoad();

  drawHorse();

  handleAnimals();

  handleDiamonds();

  drawLeaderboard();

  // update high score
  if (floor(score) > highScore) {

    highScore = floor(score);

    localStorage.setItem("highScore", highScore);
  }

  if (gameOver) {

    showGameOver();
  }
}

function drawJungle() {

  // grass sides
  fill(20, 140, 50);

  rect(50, height / 2, 100, height);

  rect(width - 50, height / 2, 100, height);

  // trees
  for (let y = 0; y < height; y += 120) {

    drawTree(40, y + 50);

    drawTree(width - 40, y + 20);
  }
}

function drawTree(x, y) {

  fill(120, 70, 20);

  rect(x, y, 20, 60);

  fill(20, 170, 50);

  ellipse(x, y - 20, 60);

  ellipse(x - 20, y, 50);

  ellipse(x + 20, y, 50);
}

function drawRoad() {

  fill(90, 70, 40);

  rect(width / 2, height / 2, width - 120, height);

  // moving road texture
  stroke(180, 140, 90);

  strokeWeight(4);

  for (let y = -40; y < height; y += 50) {

    line(
      width / 2,
      y + roadLineOffset % 50,
      width / 2,
      y + 20 + roadLineOffset % 50
    );
  }

  noStroke();
}

function moveHorse() {

  horseX = lerp(horseX, lanes[playerLane], 0.15);
}

function drawHorse() {

  if (!gameOver) {

    moveHorse();
  }

  push();

  translate(horseX, height - height * 0.16);

  // decorative cloth
  fill(255, 0, 0);

  rect(0, 10, 60, 35, 8);

  // body
  fill(139, 69, 19);

  ellipse(0, 0, 80, 45);

  // neck
  rect(25, -15, 18, 40);

  // head
  ellipse(25, -40, 35, 30);

  // ears
  triangle(15, -50, 20, -65, 25, -50);

  triangle(30, -50, 35, -65, 40, -50);

  // legs
  stroke(80, 40, 10);

  strokeWeight(5);

  line(-20, 20, -20, 55);

  line(-5, 20, -5, 55);

  line(15, 20, 15, 55);

  line(30, 20, 30, 55);

  noStroke();

  // eye
  fill(0);

  ellipse(32, -42, 4);

  pop();
}

function handleAnimals() {

  if (!gameOver) {

    if (frameCount % 90 == 0) {

      let lane = floor(random(3));

      let animalTypes = ["lion", "elephant", "deer"];

      animals.push({
        lane: lane,
        y: -100,
        type: random(animalTypes)
      });
    }
  }

  for (let i = animals.length - 1; i >= 0; i--) {

    let a = animals[i];

    let x = lanes[a.lane];

    if (!gameOver) {

      a.y += gameSpeed;
    }

    drawAnimal(x, a.y, a.type);

    // collision
    if (
      !gameOver &&
      a.lane == playerLane &&
      a.y > height - height * 0.26 &&
      a.y < height - height * 0.08
    ) {

      gameOver = true;
      if (crashSound) crashSound.play();
    }

    if (a.y > height + 100) {

      animals.splice(i, 1);
    }
  }
}

function drawAnimal(x, y, type) {

  push();

  translate(x, y);

  // LION
  if (type == "lion") {

    stroke(120, 70, 20);

    strokeWeight(4);

    line(-35, 0, -55, -15);

    noStroke();

    fill(210, 150, 60);

    ellipse(0, 0, 85, 45);

    fill(180, 120, 40);

    rect(-20, 22, 10, 28, 5);

    rect(0, 22, 10, 28, 5);

    rect(20, 22, 10, 28, 5);

    rect(38, 22, 10, 28, 5);

    fill(140, 80, 20);

    ellipse(38, -12, 42);

    fill(230, 180, 80);

    ellipse(40, -12, 28);

    fill(170, 100, 30);

    ellipse(28, -26, 10);

    ellipse(50, -26, 10);

    fill(0);

    ellipse(45, -15, 4);

    ellipse(37, -15, 4);

    triangle(41, -8, 38, -2, 44, -2);
  }

  // ELEPHANT
  else if (type == "elephant") {

    fill(130);

    ellipse(0, 0, 95, 55);

    rect(-25, 28, 14, 35, 5);

    rect(-5, 28, 14, 35, 5);

    rect(18, 28, 14, 35, 5);

    rect(40, 28, 14, 35, 5);

    ellipse(42, -5, 45, 42);

    fill(110);

    ellipse(25, -8, 24, 28);

    ellipse(55, -8, 24, 28);

    fill(120);

    rect(58, 10, 12, 40, 8);

    fill(0);

    ellipse(48, -10, 4);

    stroke(255);

    strokeWeight(3);

    line(55, 0, 70, 10);

    noStroke();
  }

  // DEER
  else if (type == "deer") {

    fill(160, 100, 50);

    ellipse(0, 0, 80, 38);

    rect(-18, 22, 6, 30, 3);

    rect(0, 22, 6, 30, 3);

    rect(20, 22, 6, 30, 3);

    rect(38, 22, 6, 30, 3);

    push();

    translate(30, -18);

    rotate(radians(-20));

    rect(0, 0, 12, 35, 5);

    pop();

    ellipse(42, -35, 28, 18);

    triangle(34, -42, 38, -52, 42, -42);

    triangle(45, -42, 50, -52, 54, -42);

    stroke(90, 60, 20);

    strokeWeight(2);

    line(35, -45, 28, -62);

    line(28, -62, 22, -70);

    line(35, -45, 38, -65);

    line(38, -65, 45, -75);

    noStroke();

    fill(0);

    ellipse(48, -35, 3);
  }

  pop();
}

function handleDiamonds() {

  if (!gameOver) {

    if (frameCount % 320 == 0) {

      let lane = floor(random(3));

      diamonds.push({
        lane: lane,
        y: -50
      });
    }
  }

  for (let i = diamonds.length - 1; i >= 0; i--) {

    let d = diamonds[i];

    let x = lanes[d.lane];

    if (!gameOver) {

      d.y += gameSpeed;
    }

    drawDiamond(x, d.y);

    // collect diamond
    if (
      d.lane == playerLane &&
      d.y > height - height * 0.26 &&
      d.y < height - height * 0.08
    ) {

      score += 20;
      if (collectSound) collectSound.play();
      diamonds.splice(i, 1);

      continue;
    }

    if (d.y > height + 50) {

      diamonds.splice(i, 1);
    }
  }
}

function drawDiamond(x, y) {

  push();

  translate(x, y);

  rotate(frameCount * 0.05);

  fill(0, 255, 255);

  stroke(255);

  beginShape();

  vertex(0, -18);

  vertex(18, 0);

  vertex(0, 18);

  vertex(-18, 0);

  endShape(CLOSE);

  pop();

  noStroke();
}

function drawLeaderboard() {

  fill(0, 150);

  rect(width - 90, 70, 150, 90, 15);

  fill(255);

  textAlign(CENTER);

  textSize(16);

  text("SCORE", width - 90, 40);

  textSize(24);

  text(floor(score), width - 90, 70);

  fill(255, 220, 0);

  textSize(15);

  text("HIGH SCORE", width - 90, 100);

  textSize(22);

  text(highScore, width - 90, 130);
}

function showGameOver() {

  if (gameOverSound && !gameOverSoundPlayed) {
    gameOverSound.play();
    gameOverSoundPlayed = true;
  }

  fill(255, 0, 0);

  textAlign(CENTER);

  textSize(50);

  text("GAME OVER", width / 2, height / 2);

  fill(255);

  textSize(22);

  text("Press R to Restart", width / 2, height / 2 + 50);
}

function keyPressed() {

  // Start audio context on first user action
  if (!audioUnlocked) {
    userStartAudio().then(() => {
      audioUnlocked = true;
      if (backgroundMusic && !backgroundMusic.isPlaying()) {
        backgroundMusic.loop();
      }
    });
  }

  if (!gameOver) {

    if (keyCode === LEFT_ARROW) {

      playerLane--;

      if (playerLane < 0) {

        playerLane = 0;
      }
    }

    if (keyCode === RIGHT_ARROW) {

      playerLane++;

      if (playerLane > 2) {

        playerLane = 2;
      }
    }
  }

  // restart
  if (key === 'r' || key === 'R') {

    restartGame();
  }
}

function mousePressed() {
  if (!audioUnlocked) {
    userStartAudio().then(() => {
      audioUnlocked = true;
      if (backgroundMusic && !backgroundMusic.isPlaying()) {
        backgroundMusic.loop();
      }
    });
  }
}

function restartGame() {

  playerLane = 1;

  horseX = lanes[playerLane];

  animals = [];

  diamonds = [];

  score = 0;

  gameSpeed = 4;

  gameOver = false;

  gameOverSoundPlayed = false;
}

// RESPONSIVE RESIZE
function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

  laneWidth = width / 3;

  lanes = [
    laneWidth / 2,
    laneWidth + laneWidth / 2,
    2 * laneWidth + laneWidth / 2
  ];

  horseX = lanes[playerLane];
}