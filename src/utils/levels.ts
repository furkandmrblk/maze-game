export const levels: Record<
  number,
  {
    start: { x: number; y: number };
    end: { x: number; y: number };
    steps: number;
  }
> = {
  0: { start: { x: 0, y: 0 }, end: { x: 19, y: 14 }, steps: 60 },
  1: { start: { x: 10, y: 5 }, end: { x: 12, y: 10 }, steps: 70 },
  2: { start: { x: 2, y: 12 }, end: { x: 0, y: 14 }, steps: 80 },
  3: { start: { x: 0, y: 10 }, end: { x: 10, y: 0 }, steps: 90 },
  4: { start: { x: 0, y: 0 }, end: { x: 16, y: 12 }, steps: 100 },
  5: { start: { x: 1, y: 1 }, end: { x: 3, y: 3 }, steps: 110 },
  6: { start: { x: 2, y: 2 }, end: { x: 9, y: 9 }, steps: 120 },
  7: { start: { x: 19, y: 14 }, end: { x: 0, y: 14 }, steps: 130 },
  8: { start: { x: 5, y: 9 }, end: { x: 3, y: 0 }, steps: 140 },
  9: { start: { x: 0, y: 14 }, end: { x: 14, y: 0 }, steps: 150 },
  10: { start: { x: 0, y: 0 }, end: { x: 19, y: 14 }, steps: 160 },
};
