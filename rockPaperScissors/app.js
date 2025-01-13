const computerChoiceDisplay = document.getElementById("computerChoice");
const playerChoiceDisplay = document.getElementById("playerChoice");
const resultDisplay = document.getElementById("result");
const playerScoreDisplay = document.getElementById("playerScore");
const computerScoreDisplay = document.getElementById("computerScore");
const resetButton = document.getElementById("reset");
const possibleChoices = document.querySelectorAll("button:not(.resetButton)");

let playerChoice;
let computerChoice;
let result;
let playerScore = 0;
let computerScore = 0;

// Event listener for user choice
possibleChoices.forEach((possibleChoice) =>
  possibleChoice.addEventListener("click", (e) => {
    playerChoice = e.target.id;
    // Validate player choice before proceeding
    if (!isValidChoice(playerChoice)) {
      result = "Invalid choice! Please choose Rock, Paper, or Scissors.";
      resultDisplay.style.color = "#ff5722"; // Set to red for invalid
      resultDisplay.innerHTML = result;
      return;
    }

    playerChoiceDisplay.innerHTML = playerChoice;
    generateComputerChoice();
    getResult();
    updateScore();
  })
);

// Generate computer choice
function generateComputerChoice() {
  const choices = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  computerChoice = choices[randomIndex];
  computerChoiceDisplay.innerHTML = computerChoice;
}

// Check if the input choice is valid
function isValidChoice(choice) {
  return ["Rock", "Paper", "Scissors"].includes(choice);
}

// Determine result
function getResult() {
  if (playerChoice === computerChoice) {
    result = "It's a draw!";
    resultDisplay.style.color = "#ff9800"; // Orange for a draw
  } else if (
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissors" && computerChoice === "Paper")
  ) {
    result = "You win!";
    resultDisplay.style.color = "#4caf50"; // Green for win
    playerScore++;
  } else {
    result = "You lose!";
    resultDisplay.style.color = "#f44336"; // Red for lose
    computerScore++;
  }
  resultDisplay.innerHTML = result;
}

// Update score display
function updateScore() {
  playerScoreDisplay.innerHTML = playerScore;
  computerScoreDisplay.innerHTML = computerScore;
}

// Reset the game
resetButton.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  playerChoice = "";
  computerChoice = "";
  result = "";
  playerChoiceDisplay.innerHTML = "-";
  computerChoiceDisplay.innerHTML = "-";
  resultDisplay.innerHTML = "-";
  updateScore();
});
