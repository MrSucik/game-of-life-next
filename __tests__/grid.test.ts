import Grid from "../game/grid";

describe("Grid utils", () => {
  it("Calculates number of alive neighbors for a cell", () => {
    const grids = [
      {
        grid: [
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
        ],
        x: 2,
        y: 2,
        result: 0,
      },
      {
        grid: [
          [false, false, false, false, false],
          [false, true, true, true, false],
          [false, true, true, true, false],
          [false, true, true, true, false],
          [false, false, false, false, false],
        ],
        x: 2,
        y: 2,
        result: 8,
      },
      {
        grid: [
          [false, false, false, false, false],
          [false, false, true, true, false],
          [false, false, false, true, false],
          [false, true, true, true, false],
          [false, false, false, false, false],
        ],
        x: 2,
        y: 2,
        result: 6,
      },
      {
        grid: [
          [false, false, false, false, false],
          [false, true, true, true, false],
          [false, false, false, true, false],
          [false, true, true, true, false],
          [false, false, false, false, false],
        ],
        x: 0,
        y: 0,
        result: 1,
      },
      {
        grid: [
          [false, false, false, false, false],
          [false, true, true, true, false],
          [false, false, false, true, false],
          [false, true, true, false, false],
          [false, false, false, true, false],
        ],
        x: 4,
        y: 4,
        result: 1,
      },
    ];

    grids.forEach(({ grid, x, y, result }) => {
      expect(new Grid(grid).getCellNeighborsCount(x, y)).toBe(result);
    });
  });

  it("Checks whether the grid is still alive", () => {
    const grids = [
      {
        grid: [
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
        ],
        result: false,
      },
      {
        grid: [
          [true, true, true, true, true],
          [true, true, true, true, true],
          [true, true, true, true, true],
          [true, true, true, true, true],
          [true, true, true, true, true],
        ],
        result: true,
      },
      {
        grid: [
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, true],
        ],
        result: true,
      },
      {
        grid: [
          [false, false, false, true, false],
          [false, false, false, false, false],
          [false, true, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, true],
        ],
        result: true,
      },
    ];

    grids.forEach(({ grid, result }) => {
      expect(new Grid(grid).isAlive()).toBe(result);
    });
  });

  it("Exports back definition format (axis are swapped)", () => {
    const initial = [
      [true, false, false],
      [false, false, true],
      [false, true, false],
      [false, true, false],
    ];
    const grid = new Grid(initial);
    expect(grid.exportAsDefinition()).toStrictEqual(initial);
  });

  it("Oscillators keep the grid alive", () => {
    const grids = [
      {
        grid: [
          [true, true],
          [true, true],
        ],
      },
      {
        grid: [
          [false, false, false, false, false],
          [false, false, true, false, false],
          [false, false, true, false, false],
          [false, false, true, false, false],
          [false, false, false, false, false],
        ],
      },
    ];
    grids.forEach((def) => {
      const grid = new Grid(def.grid);

      for (let i = 0; i < 999; i++) {
        grid.nextIteration();
      }

      expect(grid.isAlive()).toBe(true);
    });
  });

  it("Still patterns stay the same", () => {
    const grids = [
      {
        grid: [
          [true, true],
          [true, true],
        ],
      },
      {
        grid: [
          [false, false, false, false, false],
          [false, false, true, true, false],
          [false, true, false, false, true],
          [false, false, true, true, false],
          [false, false, false, false, false],
        ],
      },
      {
        grid: [
          [false, false, false, false, false],
          [false, true, true, false, false],
          [false, true, false, true, false],
          [false, false, true, false, false],
          [false, false, false, false, false],
        ],
      },
    ];
    grids.forEach((def) => {
      const grid = new Grid(def.grid);

      for (let i = 0; i < 999; i++) {
        grid.nextIteration();
      }

      expect(grid.exportAsDefinition()).toStrictEqual(def.grid);
    });
  });

  it("Unstable patterns die", () => {
    const grids = [
      {
        grid: [
          [false, false, false, false, false],
          [false, false, true, true, false],
          [false, true, false, false, true],
          [false, true, true, true, false],
          [false, false, false, false, false],
        ],
      },
      {
        grid: [
          [false, false, false, false, false, false],
          [false, false, false, false, false, false],
          [false, true, false, false, false, false],
          [false, false, true, true, true, false],
          [false, false, false, false, false, false],
        ],
      },
      {
        grid: [
          [false, false, false, false, false, false],
          [false, false, false, false, false, false],
          [false, false, false, false, false, false],
          [false, false, false, false, false, false],
          [false, false, false, false, false, false],
        ],
      },
      {
        grid: [
          [false, false, false, false, false, false],
          [false, false, false, true, false, false],
          [false, false, true, false, false, false],
          [false, true, false, false, false, false],
          [false, false, false, false, false, false],
        ],
      },
    ];
    grids.forEach((def) => {
      const grid = new Grid(def.grid);

      for (let i = 0; i < 999; i++) {
        grid.nextIteration();
      }

      expect(grid.isAlive()).toBe(false);
    });
  });

  it("Checks whether the position is outside of the grid", () => {
    const initial = [
      [true, false, false],
      [false, false, true],
      [false, true, false],
      [false, true, false],
    ];

    const grid = new Grid(initial);

    const positions = [
      { x: 0, y: 0, result: false },
      { x: -1, y: 0, result: true },
      { x: -3, y: 2, result: true },
      { x: 1, y: 0, result: false },
      { x: 0, y: 1, result: false },
      { x: 2, y: 3, result: false },
      { x: 2, y: 4, result: true },
      { x: 3, y: 3, result: true },
      { x: 6, y: 7, result: true },
    ];

    positions.forEach((pos) =>
      expect(grid.isOutOfBoundaries(pos.x, pos.y)).toStrictEqual(pos.result)
    );
  });
});
