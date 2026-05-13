let gameStarted = false;

let jumpY = 0;
let velocityY = 0;
let isJumping = false;

let sky = map(sin(frameCount * 0.002), -1, 1, 40, 180);

background(30, sky, 60);

if (!gameStarted) {

  showStartScreen();
  return;
}

function showStartScreen() {

  background(20, 120, 60);

  fill(255);

  textAlign(CENTER);

  textSize(50);

  text("Jungle Horse Run", width / 2, height / 2 - 80);

  textSize(24);

  text("Avoid Wild Animals", width / 2, height / 2);

  text("Collect Diamonds 💎", width / 2, height / 2 + 40);

  text("Press SPACE To Start", width / 2, height / 2 + 120);
}

if (key == ' ') {

  gameStarted = true;
}
translate(horseX, height - height * 0.16);

translate(horseX, height - height * 0.16 - jumpY);

if (isJumping) {

  jumpY += velocityY;

  velocityY -= 0.8;

  if (jumpY < 0) {

    jumpY = 0;
    isJumping = false;
  }
}
if (key == ' ' && !isJumping) {

  isJumping = true;

  velocityY = 15;
}