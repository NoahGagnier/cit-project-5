
import { Cell, Board } from './p5-class.js';

class TicTacToeGame {
  constructor(p = null) {
    this.board = new Board(p);
    this.players = ['X', 'O'];
    this.currentPlayerIndex = 0;
    this.isGameOver = false;
    this.winner = null;
  }

  get currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  getCell(row, col) {
    if (row >= 0 && row < this.board.rows && col >= 0 && col < this.board.cols) {
      return this.board.grid[row][col];
    }
    return null;
  }

  makeMove(row, col) {
    if (this.isGameOver) return false;

    const cell = this.getCell(row, col);
    if (cell && cell.setValue(this.currentPlayer)) {
      if (this.checkWin()) {
        this.isGameOver = true;
        this.winner = this.currentPlayer;
      } else if (this.checkDraw()) {
        this.isGameOver = true;
      } else {
        this.currentPlayerIndex = 1 - this.currentPlayerIndex;
      }
      return true;
    }
    return false;
  }

  checkWin() {
    const grid = this.board.grid;
    const p = this.currentPlayer;

    // Rows, Columns
    for (let i = 0; i < 3; i++) {
      if (grid[i][0].value === p && grid[i][1].value === p && grid[i][2].value === p) return true;
      if (grid[0][i].value === p && grid[1][i].value === p && grid[2][i].value === p) return true;
    }

    // Diagonals
    if (grid[0][0].value === p && grid[1][1].value === p && grid[2][2].value === p) return true;
    if (grid[0][2].value === p && grid[1][1].value === p && grid[2][0].value === p) return true;

    return false;
  }

  checkDraw() {
    return this.board.grid.flat().every(cell => cell.value !== null);
  }

  getBoardState() {
    return this.board.grid.map(row => row.map(cell => cell.value));
  }

  getStatus() {
    return {
      currentPlayer: this.currentPlayer,
      isGameOver: this.isGameOver,
      winner: this.winner
    };
  }
}

let game = new TicTacToeGame();

// Exported functions use that single instance
function makeMove(row, col) {
  return game.makeMove(row, col);
}

function getBoard() {
  return game.getBoardState();
}

function resetGame() {
  game = new TicTacToeGame();
}

function getStatus() {
  return game.getStatus();
}

export { makeMove, getBoard, resetGame, getStatus };
