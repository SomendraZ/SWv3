const cardsArray = [
  { name: "card1", img: "resources/cheeseburger.png" },
  { name: "card2", img: "resources/fries.png" },
  { name: "card3", img: "resources/hotdog.png" },
  { name: "card4", img: "resources/ice-cream.png" },
  { name: "card5", img: "resources/milkshake.png" },
  { name: "card6", img: "resources/pizza.png" },
  { name: "card1", img: "resources/cheeseburger.png" },
  { name: "card2", img: "resources/fries.png" },
  { name: "card3", img: "resources/hotdog.png" },
  { name: "card4", img: "resources/ice-cream.png" },
  { name: "card5", img: "resources/milkshake.png" },
  { name: "card6", img: "resources/pizza.png" },
];

// Shuffle the cards array
function shuffleCards() {
  return cardsArray.sort(() => Math.random() - 0.5);
}

let shuffledCards;
const gridDisplay = document.querySelector("#grid");
const bestScoreDisplay = document.getElementById("bestScore");

let chosenCards = [];
let chosenCardIds = [];
let matchedCards = [];
let score = 0;
let moves = 0;
let bestScore = localStorage.getItem("bestScore");
bestScoreDisplay.textContent = bestScore || 0;

// Create the board
function createBoard() {
  gridDisplay.innerHTML = "";
  shuffledCards = shuffleCards();
  shuffledCards.forEach((_, index) => {
    const card = document.createElement("img");
    card.setAttribute("src", "resources/blank.png");
    card.setAttribute("dataId", index);
    card.addEventListener("click", flipCard);
    gridDisplay.appendChild(card);
  });
}

// Flip a card
function flipCard() {
  const cardId = this.getAttribute("dataId");
  if (chosenCardIds.includes(cardId) || matchedCards.includes(cardId)) return;

  chosenCards.push(shuffledCards[cardId].name);
  chosenCardIds.push(cardId);
  this.setAttribute("src", shuffledCards[cardId].img);

  if (chosenCards.length === 2) {
    moves++;
    document.getElementById("moves").textContent = moves;
    setTimeout(checkForMatch, 500);
  }
}

// Check for a match
function checkForMatch() {
  const cards = document.querySelectorAll("#grid img");
  const [firstId, secondId] = chosenCardIds;

  if (chosenCards[0] === chosenCards[1]) {
    cards[firstId].setAttribute("src", "resources/white.png");
    cards[secondId].setAttribute("src", "resources/white.png");
    cards[firstId].removeEventListener("click", flipCard);
    cards[secondId].removeEventListener("click", flipCard);
    matchedCards.push(firstId, secondId);
    score++;
  } else {
    cards[firstId].setAttribute("src", "resources/blank.png");
    cards[secondId].setAttribute("src", "resources/blank.png");
  }

  chosenCards = [];
  chosenCardIds = [];
  document.getElementById("score").textContent = score;

  if (matchedCards.length === cardsArray.length) {
    alert(`Congratulations! You found all matches in ${moves} moves!`);
    localStorage.setItem("bestScore", Math.min(moves, bestScore));
    bestScoreDisplay.textContent = Math.min(moves, bestScore);
  }
}

// Reset the game
document.getElementById("reset").addEventListener("click", () => {
  score = 0;
  moves = 0;
  matchedCards = [];
  chosenCards = [];
  chosenCardIds = [];
  document.getElementById("score").textContent = score;
  document.getElementById("moves").textContent = moves;
  createBoard();
});

// Initialize the game
createBoard();
