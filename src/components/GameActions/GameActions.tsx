import { aStarInstance, clearAllTimeouts } from '@/utils/astar';
import { levels } from '@/utils/levels';
import { Dispatch, SetStateAction } from 'react';
import { MdClearAll, MdPlayArrow } from 'react-icons/md';

interface GameActionsProps {
  matrix: number[][];
  setMatrix: Dispatch<SetStateAction<number[][]>>;
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
  setSteps: Dispatch<SetStateAction<number>>;
  setResult: Dispatch<
    SetStateAction<
      | {
          success: boolean;
          message: string;
        }
      | undefined
    >
  >;
  setFinish: Dispatch<SetStateAction<boolean>>;
  hasBomb: (row: number, col: number) => boolean;
}

export const GameActions = ({
  level,
  setLevel,
  matrix,
  setMatrix,
  setSteps,
  setResult,
  setFinish,
  hasBomb,
}: GameActionsProps) => {
  const astar = new aStarInstance(matrix);

  astar.init();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-fit">
      <button
        onClick={async () => {
          clearAllTimeouts();

          setSteps(0);

          var elems = document.querySelectorAll('.path');

          [].forEach.call(elems, function (el: any) {
            el.classList.remove('path');
          });

          const path = astar.findPath(levels[level].start, levels[level].end);

          let count = 0;
          let touchedBomb = false;

          function executePath(path: number[][]) {
            return new Promise((resolve) => {
              path.forEach((cell, index) => {
                setTimeout(() => {
                  setSteps((prevSteps) => prevSteps + 1);

                  if (hasBomb(cell[1], cell[0])) {
                    resolve({});

                    clearAllTimeouts();
                    touchedBomb = true;
                  }

                  const cellElement = document.getElementById(
                    `cell-${cell[0]}-${cell[1]}`
                  );
                  cellElement?.classList.add('path');

                  count++;
                  if (count === path.length) {
                    resolve({});
                  }
                }, index * 60);
              });
            });
          }

          executePath(path).then(() => {
            if (
              (levels[level].exactSteps
                ? levels[level].steps === count
                : levels[level].steps <= count) &&
              !touchedBomb
            ) {
              setResult({
                success: true,
                message: 'Successfully cleared level! Loading new level.',
              });

              setTimeout(() => {
                var elems = document.querySelectorAll('.path');

                [].forEach.call(elems, function (el: any) {
                  el.classList.remove('path');
                });

                setMatrix(
                  new Array(15).fill(0).map(() => new Array(20).fill(0))
                );
                setSteps(0);

                if (!levels[level + 1]) {
                  setFinish(true);
                  setResult(undefined);
                } else {
                  setLevel((state) => state + 1);

                  window.localStorage.setItem('maze-lv', String(level + 1));

                  setResult(undefined);
                }
              }, 2000);
            } else {
              if (touchedBomb) {
                setResult({
                  success: false,
                  message: 'You touched a bomb. Try again :)',
                });
              } else {
                let message: string = '';
                if (levels[level].exactSteps) {
                  message = 'Not exact steps reached. Try agaainnn :D';
                } else message = 'Not enough steps reached! Try again :p';

                setResult({
                  success: false,
                  message,
                });
              }

              setTimeout(() => setResult(undefined), 3000);
            }
          });
        }}
        className="flex items-center gap-2 px-[1.5125rem] py-1"
      >
        <MdPlayArrow size={16} />
        <p>Start</p>
      </button>
      <button
        onClick={() =>
          setMatrix(new Array(15).fill(0).map(() => new Array(20).fill(0)))
        }
        className="flex items-center gap-2 px-[1.5125rem] py-1"
      >
        <MdClearAll size={16} />
        <p>Clear all blocks</p>
      </button>
    </div>
  );
};
