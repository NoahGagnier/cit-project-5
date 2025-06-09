document.addEventListener('DOMContentLoaded', () => {
  const boardDiv = document.getElementById('board');
  const statusDiv = document.getElementById('status');
  const resetBtn = document.getElementById('reset');
  const overlay = document.getElementById('overlay');
  const overlayMessage = document.getElementById('overlay-message');
  const overlayButton = document.getElementById('overlay-button');

  async function fetchGameState() {
    const res = await fetch('/api/status');
    const data = await res.json();
    updateStatus(data);
    if (data.isGameOver) showOverlay(data.winner);
  }

  async function fetchBoard() {
    const res = await fetch('/api/board');
    const data = await res.json();
    renderBoard(data.board);
  }

  function updateStatus({ currentPlayer, isGameOver, winner }) {
    if (isGameOver) {
      statusDiv.textContent = winner ? `Player ${winner} wins!` : 'It\'s a draw!';
    } else {
      statusDiv.textContent = `Current Player: ${currentPlayer}`;
    }
  }

  function renderBoard(board) {
    boardDiv.innerHTML = '';
    board.forEach((row, r) => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row');

      row.forEach((cellValue, c) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        if (cellValue === 'X') {
          cell.textContent = 'X';
          cell.style.color = 'red';
        } else if (cellValue === 'O') {
          cell.textContent = 'O';
          cell.style.color = 'green';
        }

        cell.addEventListener('click', () => handleMove(r, c));
        rowDiv.appendChild(cell);
      });

      boardDiv.appendChild(rowDiv);
    });
  }

  async function handleMove(row, col) {
    const res = await fetch('/api/move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ row, col })
    });

    const data = await res.json();
    renderBoard(data.board);
    updateStatus(data);
    if (data.isGameOver) showOverlay(data.winner);
  }

  async function resetGame() {
    await fetch('/api/reset', { method: 'POST' });
    await fetchBoard();
    await fetchGameState();
    hideOverlay();
  }

  function showOverlay(winner) {
    overlayMessage.textContent = winner ? `🎉 Player ${winner} Wins!` : `🤝 It's a Draw!`;
    overlay.classList.add('show');
  }

  function hideOverlay() {
    overlay.classList.remove('show');
  }

  resetBtn.addEventListener('click', resetGame);
  overlayButton.addEventListener('click', resetGame);

  fetchBoard();
  fetchGameState();
});

