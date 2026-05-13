let gameStarted = false;

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