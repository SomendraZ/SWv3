const timeLeft = document.querySelector("#timeLeft");
const resultDisplay = document.querySelector("#result");
const squares = document.querySelectorAll(".grid div");
const logsLeft = document.querySelectorAll(".logLeft");
const logsRight = document.querySelectorAll(".logRight");
const carsLeft = document.querySelectorAll(".carLeft");
const carsRight = document.querySelectorAll(".carRight");
const audio = document.querySelector("#backgroundAudio");
const startButton = document.querySelector("#startButton");

let currIdx = 76;
let result = 0;
let timerId = null;
let timeRemaining = 30;
let gameStarted = false;
let gameOver = false;

// Audio files
const jumpSound = new Audio("sounds/jump.mp3");
const collisionSound = new Audio("sounds/collision.mp3");
const goalSound = new Audio("sounds/goal.mp3");

function renderFrog() {
  squares.forEach((square) => square.classList.remove("frog"));
  squares[currIdx].classList.add("frog");
}

function moveFrog(e) {
  if (gameOver) return;

  squares[currIdx].classList.remove("frog");

  switch (e.key) {
    case "ArrowUp":
      if (currIdx - 9 >= 0) currIdx -= 9;
      break;
    case "ArrowDown":
      if (currIdx + 9 < squares.length) currIdx += 9;
      break;
    case "ArrowLeft":
      if (currIdx % 9 !== 0) currIdx -= 1;
      break;
    case "ArrowRight":
      if (currIdx % 9 < 8) currIdx += 1;
      break;
  }
  jumpSound.play();
  renderFrog();
  setTimeout(checkGameState, 50);
}

function checkGameState() {
  if (squares[currIdx].classList.contains("endingBlock") && !gameOver) {
    resultDisplay.textContent = "You Win!";
    clearInterval(timerId);
    document.removeEventListener("keyup", moveFrog);
    gameStarted = false;
    gameOver = true;
    goalSound.play();
    alert("You win this round!");
    audio.pause();
  }
}

function autoMoveLogs() {
  if (!gameStarted || gameOver) return;

  logsLeft.forEach((log) => moveLogLeft(log));
  logsRight.forEach((log) => moveLogRight(log));
  carsLeft.forEach((car) => moveCarLeft(car));
  carsRight.forEach((car) => moveCarRight(car));
  loss();
}

function moveLogLeft(logLeft) {
  if (logLeft.classList.contains("l1")) {
    logLeft.classList.replace("l1", "l2");
  } else if (logLeft.classList.contains("l2")) {
    logLeft.classList.replace("l2", "l3");
  } else if (logLeft.classList.contains("l3")) {
    logLeft.classList.replace("l3", "l4");
  } else if (logLeft.classList.contains("l4")) {
    logLeft.classList.replace("l4", "l5");
  } else if (logLeft.classList.contains("l5")) {
    logLeft.classList.replace("l5", "l1");
  }
}

function moveLogRight(logRight) {
  if (logRight.classList.contains("l1")) {
    logRight.classList.replace("l1", "l5");
  } else if (logRight.classList.contains("l5")) {
    logRight.classList.replace("l5", "l4");
  } else if (logRight.classList.contains("l4")) {
    logRight.classList.replace("l4", "l3");
  } else if (logRight.classList.contains("l3")) {
    logRight.classList.replace("l3", "l2");
  } else if (logRight.classList.contains("l2")) {
    logRight.classList.replace("l2", "l1");
  }
}

function moveCarLeft(carLeft) {
  if (carLeft.classList.contains("c1")) {
    carLeft.classList.replace("c1", "c2");
  } else if (carLeft.classList.contains("c2")) {
    carLeft.classList.replace("c2", "c3");
  } else if (carLeft.classList.contains("c3")) {
    carLeft.classList.replace("c3", "c1");
  }
}

function moveCarRight(carRight) {
  if (carRight.classList.contains("c1")) {
    carRight.classList.replace("c1", "c3");
  } else if (carRight.classList.contains("c3")) {
    carRight.classList.replace("c3", "c2");
  } else if (carRight.classList.contains("c2")) {
    carRight.classList.replace("c2", "c1");
  }
}

timerId = setInterval(autoMoveLogs, 500);

function loss() {
  if (
    squares[currIdx].classList.contains("c1") ||
    squares[currIdx].classList.contains("l4") ||
    squares[currIdx].classList.contains("l5")
  ) {
    if (!gameOver) {
      resultDisplay.textContent = "You lose!";
      clearInterval(timerId);
      document.removeEventListener("keyup", moveFrog);
      gameOver = true;
      collisionSound.play();
      alert("Game Over! You lost!");
      audio.pause();
    }
  }
}

function restartGame() {
  location.reload();
}

startButton.addEventListener("click", () => {
  audio.play();
  gameStarted = true;
  renderFrog();
  document.addEventListener("keyup", moveFrog);

  timerId = setInterval(() => {
    if (gameOver) return;

    timeRemaining--;
    timeLeft.textContent = timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(timerId);
      document.removeEventListener("keyup", moveFrog);
      alert("Time's up! You lose!");
      gameOver = true;
      audio.pause();
    }
  }, 1000);

  startButton.style.display = "none"; // Hide the button after starting the game
});
