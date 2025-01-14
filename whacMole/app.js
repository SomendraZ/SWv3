const squares = document.querySelectorAll(".square");
const timeLeft = document.querySelector("#timeLeft");
const score = document.querySelector("#score");
const startBtn = document.querySelector("#start");

let result = 0;
let hitPosition;
let currTime = 60;
let timerId = null;
let countDownTimer = null; // Declare this globally

// Function to pick a random square
function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  const randomPosition = squares[Math.floor(Math.random() * squares.length)];
  randomPosition.classList.add("mole");

  hitPosition = randomPosition.id;
}

// Add event listeners to squares
squares.forEach((square) => {
  square.addEventListener("mouseup", () => {
    if (square.id === hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
      clearInterval(timerId);
      randomSquare();
      timerId = setInterval(randomSquare, 1000);
    }
  });
});

// Function to move the mole at regular intervals
function moveMole() {
  randomSquare(); // Ensure the mole appears immediately
  timerId = setInterval(randomSquare, 1000);
}

// Countdown timer
function countDown() {
  currTime--;
  timeLeft.textContent = currTime;

  if (currTime === 0) {
    clearInterval(countDownTimer);
    clearInterval(timerId);
    alert(`Game Over! Your final score is ${result}!`);
  }
}

// Start/Restart the game
startBtn.addEventListener("click", () => {
  // Clear any existing timers to avoid glitches
  clearInterval(timerId);
  clearInterval(countDownTimer);

  // Reset game state
  result = 0;
  currTime = 60;
  score.textContent = result;
  timeLeft.textContent = currTime;

  // Start mole movement and countdown
  moveMole();
  countDownTimer = setInterval(countDown, 1000);

  // Update button text
  startBtn.innerHTML = "Restart";
});
