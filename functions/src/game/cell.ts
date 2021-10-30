export default class Cell {
  x: number;
  y: number;
  alive: boolean;
  constructor(x: number, y: number, alive: boolean) {
    this.x = x;
    this.y = y;
    this.alive = alive;
  }

  nextIteration = (neighborsCount: number) => {
    let survive = false;
    if (this.alive === false) {
      if (neighborsCount === 3) {
        survive = true;
      }
    } else {
      if (neighborsCount === 2 || neighborsCount === 3) {
        survive = true;
      }
    }
    this.alive = survive;
  };
}
