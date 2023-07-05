import { AStarFinder } from 'astar-typescript';
import { IPoint } from 'astar-typescript/dist/interfaces/astar.interfaces';

export class aStarInstance {
  private aStarFinder!: AStarFinder;

  constructor(public matrix: number[][]) {
    this.matrix = matrix;
  }

  init() {
    this.aStarFinder = new AStarFinder({
      grid: {
        matrix: this.matrix,
      },
      diagonalAllowed: false,
    });
  }

  findPath(start: IPoint, goal: IPoint) {
    return this.aStarFinder.findPath(start, goal);
  }
}

export const clearAllTimeouts = async () => {
  let lastTimeout = setTimeout(() => {}, 0);

  let num = Number(lastTimeout);

  while (num--) {
    clearTimeout(num);
  }
};
