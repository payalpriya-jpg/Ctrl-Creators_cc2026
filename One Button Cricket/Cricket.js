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