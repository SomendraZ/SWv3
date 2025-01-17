const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");

let currentShooterIndex = 202;
let direction = 1;
let invadersId;
let goingRight = true;
let alienInvadersRemoved = [];
let result = 0;
let currentLevel = 1;
let moveInterval = 250;

for (let i = 0; i < 225; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

const levels = [
  [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39,
  ],
  [
    0, 1, 2, 3, 4, 15, 16, 17, 18, 19, 30, 31, 32, 33, 34, 45, 46, 47, 48, 49,
    60, 61, 62, 63, 64,
  ],
  [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 21, 22, 23, 24, 32,
    33, 34, 35, 36, 37, 38, 48, 49, 50, 51, 52, 64, 65, 66, 80,
  ],
];

let alienInvaders = [...levels[0]];

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!alienInvadersRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add("invader");
    }
  }
}

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove("invader");
  }
}

squares[currentShooterIndex].classList.add("shooter");

function moveShooter(e) {
  squares[currentShooterIndex].classList.remove("shooter");
  switch (e.key) {
    case "ArrowLeft":
      if (currentShooterIndex % 15 !== 0) currentShooterIndex -= 1;
      break;
    case "ArrowRight":
      if (currentShooterIndex % 15 < 14) currentShooterIndex += 1;
      break;
  }
  squares[currentShooterIndex].classList.add("shooter");
}
document.addEventListener("keydown", moveShooter);

function moveInvaders() {
  const leftEdge = alienInvaders.some((invader) => invader % 15 === 0);
  const rightEdge = alienInvaders.some((invader) => invader % 15 === 14);
  remove();

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += 15 + 1;
    }
    direction = -1;
    goingRight = false;
  } else if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += 15 - 1;
    }
    direction = 1;
    goingRight = true;
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }
  draw();

  if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
    scoreDisplay.innerHTML = "Game Over";
    squares[currentShooterIndex].classList.remove("shooter");
    document.removeEventListener("keydown", moveShooter);
    document.removeEventListener("keyup", shoot);
    clearInterval(invadersId);
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders[i] >= squares.length) {
      scoreDisplay.innerHTML = "Game Over";
      document.removeEventListener("keydown", moveShooter);
      document.removeEventListener("keyup", shoot);
      clearInterval(invadersId);
    }
  }

  if (alienInvadersRemoved.length === alienInvaders.length) {
    if (currentLevel < levels.length) {
      nextLevel();
    } else {
      scoreDisplay.innerHTML = "You Win!";
      document.removeEventListener("keydown", moveShooter);
      document.removeEventListener("keyup", shoot);
      clearInterval(invadersId);
    }
  }
}

function nextLevel() {
  currentLevel++;
  alienInvaders = [...levels[currentLevel - 1]];
  alienInvadersRemoved = [];
  moveInterval -= 50;
  clearInterval(invadersId);
  invadersId = setInterval(moveInvaders, moveInterval);
  draw();
}

invadersId = setInterval(moveInvaders, moveInterval);

function shoot(e) {
  let laserId;
  let currentLaserIndex = currentShooterIndex;
  function moveLaser() {
    squares[currentLaserIndex].classList.remove("laser");
    currentLaserIndex -= 15;
    if (currentLaserIndex < 0) {
      clearInterval(laserId);
      return;
    }
    squares[currentLaserIndex].classList.add("laser");

    if (squares[currentLaserIndex].classList.contains("invader")) {
      squares[currentLaserIndex].classList.remove("laser");
      squares[currentLaserIndex].classList.remove("invader");
      squares[currentLaserIndex].classList.add("boom");

      setTimeout(
        () => squares[currentLaserIndex].classList.remove("boom"),
        250
      );
      clearInterval(laserId);

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
      alienInvadersRemoved.push(alienRemoved);
      result++;
      scoreDisplay.innerHTML = result;
    }
  }
  switch (e.key) {
    case "ArrowUp":
      laserId = setInterval(moveLaser, 100);
  }
}

document.addEventListener("keyup", shoot);
