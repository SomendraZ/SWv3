const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector(".score");
const brickBreakSound = new Audio("sounds/brickBreak.mp3");
const gameWinSound = new Audio("sounds/win.mp3");
const gameOverSound = new Audio("sounds/lose.mp3");
const blockWidth = 7.5;
const blockHeight = 1.5;
const ballDiameter = 1.5;
const boardWidth = 39.25;
const boardHeight = 25;

let xDirection = -0.3;
let yDirection = 0.3;

const userStart = [16, 2];
let currentPosition = [...userStart];

const ballStart = [19, 4];
let ballCurrentPosition = [...ballStart];

let timerId;
let score = 0;

class Block {
  constructor(x, y) {
    this.bottomLeft = [x, y];
    this.bottomRight = [x + blockWidth, y];
    this.topLeft = [x, y + blockHeight];
    this.topRight = [x + blockWidth, y + blockHeight];
  }
}

const blocks = [];
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 5; col++) {
    const x = col * (blockWidth + 0.5);
    const y = boardHeight - (row + 1) * (blockHeight + 0.5);
    blocks.push(new Block(x, y));
  }
}

function addBlocks() {
  blocks.forEach((block) => {
    const blockDiv = document.createElement("div");
    blockDiv.classList.add("block");
    blockDiv.style.left = block.bottomLeft[0] + "vw";
    blockDiv.style.bottom = block.bottomLeft[1] + "vw";
    grid.appendChild(blockDiv);
  });
}
addBlocks();

const user = document.createElement("div");
user.classList.add("user");
grid.appendChild(user);
drawUser();

const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);
drawBall();

function drawUser() {
  user.style.left = currentPosition[0] + "vw";
  user.style.bottom = currentPosition[1] + "vw";
}

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "vw";
  ball.style.bottom = ballCurrentPosition[1] + "vw";
}

function moveUser(e) {
  const paddleSpeed = 3; // Adjust this value to change the paddle speed
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= paddleSpeed;
        if (currentPosition[0] < 0) currentPosition[0] = 0; // Prevent going off the left edge
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += paddleSpeed;
        if (currentPosition[0] > boardWidth - blockWidth)
          currentPosition[0] = boardWidth - blockWidth; // Prevent going off the right edge
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}
timerId = setInterval(moveBall, 20);

function checkForCollisions() {
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      brickBreakSound.play();
      scoreDisplay.textContent = `Score: ${score}`;
      if (blocks.length === 0) {
        scoreDisplay.textContent = "You Win!";
        clearInterval(timerId);
        gameWinSound.play();
        document.removeEventListener("keydown", moveUser);
      }
    }
  }

  if (
    ballCurrentPosition[0] <= 0 ||
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter
  ) {
    changeDirection();
  }

  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }

  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.textContent = "Game Over!";
    gameOverSound.play();
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection > 0 && yDirection > 0) {
    yDirection = -yDirection;
  } else if (xDirection > 0 && yDirection < 0) {
    xDirection = -xDirection;
  } else if (xDirection < 0 && yDirection < 0) {
    yDirection = -yDirection;
  } else {
    xDirection = -xDirection;
  }
}
