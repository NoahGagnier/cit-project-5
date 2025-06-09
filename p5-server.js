import express from 'express';
import { makeMove, getBoard, resetGame, getStatus } from './p5-game.js';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.static('public'));

// GET board state
app.get('/api/board', (req, res) => {
  res.json({ board: getBoard() });
});

// GET game status (current player, game over, winner)
app.get('/api/status', (req, res) => {
  res.json(getStatus());
});

// POST make a move
app.post('/api/move', (req, res) => {
  const { row, col } = req.body;
  const success = makeMove(row, col);
  res.json({
    success,
    board: getBoard(),
    ...getStatus()
  });
});

// POST reset game
app.post('/api/reset', (req, res) => {
  resetGame();
  res.json({
    board: getBoard(),
    ...getStatus()
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
