document.addEventListener("DOMContentLoaded", function () {
  const squares = document.querySelectorAll(".grid div");
  const result = document.querySelector("#result");
  const displayCurrentPlayer = document.querySelector("#player");
  let currPlayer = 1;
  let gameActive = true;

  for (let i = 0; i < squares.length; i++) {
    squares[i].onclick = function () {
      if (!gameActive) return;

      if (
        squares[i + 7] &&
        squares[i + 7].classList.contains("taken") &&
        !squares[i].classList.contains("taken")
      ) {
        if (currPlayer === 1) {
          squares[i].classList.add("taken", "player1");
          currPlayer = 2;
        } else {
          squares[i].classList.add("taken", "player2");
          currPlayer = 1;
        }
        displayCurrentPlayer.innerHTML = currPlayer;
      } else if (!squares[i + 7]) {
        if (!squares[i].classList.contains("taken")) {
          if (currPlayer === 1) {
            squares[i].classList.add("taken", "player1");
            currPlayer = 2;
          } else {
            squares[i].classList.add("taken", "player2");
            currPlayer = 1;
          }
          displayCurrentPlayer.innerHTML = currPlayer;
        }
      } else {
        alert("Invalid move! You cannot go here.");
      }
      checkBoard();
    };
  }

  const winningArrays = [
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
    [7, 8, 9, 10],
    [8, 9, 10, 11],
    [9, 10, 11, 12],
    [10, 11, 12, 13],
    [14, 15, 16, 17],
    [15, 16, 17, 18],
    [16, 17, 18, 19],
    [17, 18, 19, 20],
    [21, 22, 23, 24],
    [22, 23, 24, 25],
    [23, 24, 25, 26],
    [24, 25, 26, 27],
    [28, 29, 30, 31],
    [29, 30, 31, 32],
    [30, 31, 32, 33],
    [31, 32, 33, 34],
    [35, 36, 37, 38],
    [36, 37, 38, 39],
    [37, 38, 39, 40],
    [38, 39, 40, 41],
    [0, 7, 14, 21],
    [7, 14, 21, 28],
    [14, 21, 28, 35],
    [1, 8, 15, 22],
    [8, 15, 22, 29],
    [15, 22, 29, 36],
    [2, 9, 16, 23],
    [9, 16, 23, 30],
    [16, 23, 30, 37],
    [3, 10, 17, 24],
    [10, 17, 24, 31],
    [17, 24, 31, 38],
    [4, 11, 18, 25],
    [11, 18, 25, 32],
    [18, 25, 32, 39],
    [5, 12, 19, 26],
    [12, 19, 26, 33],
    [19, 26, 33, 40],
    [6, 13, 20, 27],
    [13, 20, 27, 34],
    [20, 27, 34, 41],
    [14, 22, 30, 38],
    [7, 15, 23, 31],
    [15, 23, 31, 39],
    [0, 8, 16, 24],
    [8, 16, 24, 32],
    [16, 24, 32, 40],
    [1, 9, 17, 25],
    [9, 17, 25, 33],
    [17, 25, 33, 41],
    [2, 10, 18, 26],
    [10, 18, 26, 34],
    [3, 11, 19, 27],
    [3, 9, 15, 21],
    [4, 10, 16, 22],
    [10, 16, 22, 28],
    [5, 11, 17, 23],
    [11, 17, 23, 29],
    [17, 23, 29, 35],
    [6, 12, 18, 24],
    [12, 18, 24, 30],
    [18, 24, 30, 36],
    [13, 19, 25, 31],
    [19, 25, 31, 37],
    [20, 26, 32, 38],
  ];

  function checkBoard() {
    for (let y = 0; y < winningArrays.length; y++) {
      const square1 = squares[winningArrays[y][0]];
      const square2 = squares[winningArrays[y][1]];
      const square3 = squares[winningArrays[y][2]];
      const square4 = squares[winningArrays[y][3]];

      if (
        square1.classList.contains("player1") &&
        square2.classList.contains("player1") &&
        square3.classList.contains("player1") &&
        square4.classList.contains("player1")
      ) {
        result.innerHTML = "Player 1 wins!";
        gameActive = false;
        return;
      }
      if (
        square1.classList.contains("player2") &&
        square2.classList.contains("player2") &&
        square3.classList.contains("player2") &&
        square4.classList.contains("player2")
      ) {
        result.innerHTML = "Player 2 wins!";
        gameActive = false;
        return;
      }
    }
  }
});
