const squares = document.querySelectorAll(".square");
const timeLeft = document.querySelector("#timeLeft");
const score = document.querySelector("#score");
const startBtn = document.querySelector("#start");
const bestScore = document.querySelector("#bestScore");

let result = 0;
let hitPosition;
let currTime = 60;
let timerId = null;
let countDownTimer = null;
let gameActive = false;
let best = localStorage.getItem("bestScoreWhac") || 0;
const hitSound = new Audio("sounds/hit.mp3");

bestScore.textContent = best;

function randomSquare() {
  if (!gameActive) return;

  squares.forEach((square) => {
    square.classList.remove("mole", "bonusMole");
  });

  const randomPosition = squares[Math.floor(Math.random() * squares.length)];
  const isBonus = Math.random() < 0.2;

  if (isBonus) {
    randomPosition.classList.add("bonusMole");
    hitPosition = { id: randomPosition.id, type: "bonus" };
  } else {
    randomPosition.classList.add("mole");
    hitPosition = { id: randomPosition.id, type: "regular" };
  }
}

squares.forEach((square) => {
  square.addEventListener("mouseup", () => {
    if (!gameActive || !hitPosition) return;

    if (square.id === hitPosition.id) {
      if (hitPosition.type === "bonus") {
        result += 5;
      } else {
        result++;
      }

      score.textContent = result;
      hitPosition = null;

      clearInterval(timerId);
      randomSquare();
      timerId = setInterval(randomSquare, 1000);
      hitSound.play();
    }
  });
});

function moveMole() {
  randomSquare();
  timerId = setInterval(randomSquare, 1000);
}

function countDown() {
  currTime--;
  timeLeft.textContent = currTime;

  if (currTime === 0) {
    clearInterval(countDownTimer);
    clearInterval(timerId);
    gameActive = false;

    if (result > best) {
      best = result;
      localStorage.setItem("bestScoreWhac", best);
      bestScore.textContent = best;
    }

    alert(`Game Over! Your final score is ${result}!`);
    startBtn.disabled = false;
  }
}

startBtn.addEventListener("click", () => {
  clearInterval(timerId);
  clearInterval(countDownTimer);

  result = 0;
  currTime = 60;
  score.textContent = result;
  timeLeft.textContent = currTime;

  gameActive = true;
  moveMole();
  countDownTimer = setInterval(countDown, 1000);

  startBtn.disabled = true;
  startBtn.innerHTML = "Restart";
});
