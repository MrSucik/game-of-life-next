import Cell from "../game/cell";

describe("Live cells survival rules", () => {
  const initialCellState = true;
  it("Any live cell with fewer than two live neighbours dies, as if by underpopulation", () => {
    const cell1 = new Cell(0, 0, initialCellState);
    const cell2 = new Cell(0, 0, initialCellState);

    cell1.nextIteration(0);
    cell2.nextIteration(1);

    expect(cell1.alive).toBe(false);
    expect(cell1.alive).toBe(false);
  });
  it("Any live cell with two or three live neighbours survives", () => {
    const cell1 = new Cell(0, 0, initialCellState);
    const cell2 = new Cell(0, 0, initialCellState);

    cell1.nextIteration(2);
    cell2.nextIteration(3);

    expect(cell1.alive).toBe(true);
    expect(cell1.alive).toBe(true);
  });
  it("Any live cell with more than three live neighbours dies, as if by overpopulation", () => {
    for (let index = 4; index < 10; index++) {
      const cell = new Cell(0, 0, initialCellState);

      cell.nextIteration(index);

      expect(cell.alive).toBe(false);
    }
  });
});

describe("Dead cells survival rules", () => {
  const initialCellState = false;
  it("Any dead cell with three live neighbours becomes a live cell", () => {
    const cell = new Cell(0, 0, initialCellState);

    cell.nextIteration(3);

    expect(cell.alive).toBe(true);
  });
  it("Any dead cell will stay dead unless having 3 neighbors", () => {
    for (let index = 4; index < 10; index++) {
      if (index === 3) {
        continue;
      }
      const cell = new Cell(0, 0, initialCellState);

      cell.nextIteration(index);

      expect(cell.alive).toBe(false);
    }
  });
});
