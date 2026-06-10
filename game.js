document.addEventListener('DOMContentLoaded', function () {
  const boardEl = document.getElementById('board');
  const cells = boardEl.querySelectorAll('.cell');
  const status = document.getElementById('status');
  const restartBtn = document.getElementById('restart');

  // Game state
  let board = Array(9).fill(null);
  let currentPlayer = 'X';
  let gameOver = false;

  // All possible winning lines: 3 rows, 3 columns, 2 diagonals
  const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  function init() {
    // TODO: initialize game state and attach event listeners
  }

  init();
});
