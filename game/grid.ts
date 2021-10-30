import Cell from "./cell";

type CellGridDefinition = boolean[][];
type CellGrid = Cell[][];

export default class Grid {
  grid: CellGrid;
  rowsCount: number;
  columnsCount: number;
  iteration: number;

  constructor(initialGrid: CellGridDefinition) {
    this.rowsCount = initialGrid.length;
    this.columnsCount = initialGrid[0]?.length || 0;
    this.grid = this.createGrid(initialGrid);
    this.iteration = 0;
  }

  // Processes all cells' rules and updates the grid
  nextIteration = () => {
    const nextGrid: CellGrid = [];
    for (let x = 0; x < this.columnsCount; x++) {
      nextGrid[x] = [];
      for (let y = 0; y < this.rowsCount; y++) {
        const neighborsCount = this.getCellNeighborsCount(x, y);
        const cell = this.grid[x][y];
        const copy = new Cell(cell.x, cell.y, cell.alive);
        copy.nextIteration(neighborsCount);
        nextGrid[x][y] = copy;
      }
    }
    this.grid = nextGrid;
    this.iteration += 1;
  };

  // Contains any living cell
  isAlive = () => {
    for (let x = 0; x < this.columnsCount; x++) {
      for (let y = 0; y < this.rowsCount; y++) {
        if (this.grid[x][y].alive === true) {
          return true;
        }
      }
    }
    return false;
  };

  // Counts all living cell neighbors (including diagonal)
  getCellNeighborsCount = (targetX: number, targetY: number) => {
    let count = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        // Skip self
        if (y === 0 && x === 0) {
          continue;
        }

        const nextX = targetX + x;
        const nextY = targetY + y;
        const out = this.isOutOfBoundaries(nextX, nextY);
        if (out) {
          continue;
        }

        const cell = this.grid[nextX][nextY];
        if (cell.alive) {
          count++;
        }
      }
    }
    return count;
  };

  // Returns current iteration mapped back to definition format
  exportAsDefinition = () => {
    const grid: CellGridDefinition = [];
    for (let y = 0; y < this.rowsCount; y++) {
      for (let x = 0; x < this.columnsCount; x++) {
        if (!grid[y]) {
          grid[y] = [];
        }
        grid[y][x] = this.grid[x][y].alive;
      }
    }
    return grid;
  };

  // Checks whether the position is outside of the grid
  isOutOfBoundaries = (x: number, y: number) => {
    if (x < 0 || y < 0) {
      return true;
    }
    if (x > this.columnsCount - 1 || y > this.rowsCount - 1) {
      return true;
    }
    return false;
  };

  private createGrid = (initial: CellGridDefinition) => {
    const grid: CellGrid = [];
    for (let y = 0; y < this.rowsCount; y++) {
      for (let x = 0; x < this.columnsCount; x++) {
        if (!grid[x]) {
          grid[x] = [];
        }
        grid[x][y] = new Cell(x, y, initial[y][x]);
      }
    }
    return grid;
  };
}
