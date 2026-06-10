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

  function resetGame() {
    board.fill(null);
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach(function (cell) {
      cell.textContent = '';
      cell.className = 'cell';
    });
    status.textContent = "Player X's turn";
  }

  function handleCellClick(event) {
    var cell = event.target;
    if (!cell.classList.contains('cell')) return;
    var index = parseInt(cell.getAttribute('data-index'), 10);
    if (board[index] !== null) return;
    if (gameOver) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    var winCombo = checkWin();
    if (winCombo) {
      status.textContent = 'Player ' + currentPlayer + ' wins!';
      gameOver = true;
    } else if (checkDraw()) {
      status.textContent = "It's a draw!";
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = "Player " + currentPlayer + "'s turn";
    }
  }

  function checkWin() {
    for (var i = 0; i < WINNING_COMBOS.length; i++) {
      var combo = WINNING_COMBOS[i];
      if (board[combo[0]] === currentPlayer &&
          board[combo[1]] === currentPlayer &&
          board[combo[2]] === currentPlayer) {
        return combo;
      }
    }
    return null;
  }

  function checkDraw() {
    return board.every(function (cell) { return cell !== null; }) && checkWin() === null;
  }

  function init() {
    boardEl.addEventListener('click', handleCellClick);
    restartBtn.addEventListener('click', resetGame);
  }

  init();
});
