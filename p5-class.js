
// Class representing a single cell on the Tic Tac Toe board
class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.value = null;
  }

  isEmpty() {
    return this.value === null;
  }

  setValue(player) {
    if (this.isEmpty()) {
      this.value = player;
      return true;
    }
    return false;
  }

  draw(p) {
    p.stroke(0);
    p.noFill();
    p.rect(this.x, this.y, this.size, this.size);

    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(this.size * 0.5);
    p.fill(0);
    p.text(this.value ?? '', this.x + this.size / 2, this.y + this.size / 2); 
  }
}
  
  // Class representing the game board
  class Board {
    constructor(p, rows = 3, cols = 3, cellSize = 100) {
      this.p = p;
      this.rows = rows;
      this.cols = cols;
      this.cellSize = cellSize;
      this.grid = this.createGrid();
    }
  
    createGrid() {
      let grid = [];
      for (let i = 0; i < this.rows; i++) {
        let row = [];
        for (let j = 0; j < this.cols; j++) {
          row.push(new Cell(j * this.cellSize, i * this.cellSize, this.cellSize));
        }
        grid.push(row);
      }
      return grid;
    }
  
    getCellAt(x, y) {
      let row = Math.floor(y / this.cellSize);
      let col = Math.floor(x / this.cellSize);
      if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
        return this.grid[row][col];
      }
      return null;
    }
  
    draw() {
      for (let row of this.grid) {
        for (let cell of row) {
          cell.draw(this.p);
        }
      }
    }
  }
  
  // Export 
export { Cell, Board };

  