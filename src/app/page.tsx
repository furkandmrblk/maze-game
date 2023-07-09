'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { aStarInstance, clearAllTimeouts } from '@/utils/astar';
import { levels } from '@/utils/levels';
import { motion } from 'framer-motion';
import { FaBomb } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { MdClearAll, MdPlayArrow } from 'react-icons/md';

// TODO: More levels
// TODO: Bombs?

export default function Home() {
  const map = new Array(15).fill(0).map(() => new Array(20).fill(0));

  const mazeRef = useRef<HTMLDivElement>(null);

  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const [isPressed, setPressed] = useState(false);

  const [matrix, setMatrix] = useState<number[][]>(map);

  const [level, setLevel] = useState<number>(0);

  const [steps, setSteps] = useState<number>(0);

  const [result, setResult] = useState<
    { success: boolean; message: string } | undefined
  >(undefined);

  const [finish, setFinish] = useState<boolean>(false);

  useEffect(() => {
    const item = window.localStorage.getItem('maze-lv');

    if (item) {
      setLevel(Number(item));
    }

    setInitialLoad(true);
  }, []);

  const astar = new aStarInstance(matrix);

  astar.init();

  const setBlock = (
    col: number,
    row: number,
    isStart: boolean,
    isEnd: boolean
  ) => {
    if (!isStart && !isEnd && !hasBomb(row, col)) {
      const updatedMatrix = [...matrix];

      if (updatedMatrix[row][col] === 0) {
        updatedMatrix[row][col] = 1;
      } else updatedMatrix[row][col] = 0;

      setMatrix(updatedMatrix);
    }
  };

  const isStartPoint = (coords: { x: number; y: number }): boolean => {
    return (
      coords.y === levels[level].start.y && coords.x === levels[level].start.x
    );
  };

  const isEndPoint = (coords: { x: number; y: number }): boolean => {
    return coords.y === levels[level].end.y && coords.x === levels[level].end.x;
  };

  const handleMouseDown = () => {
    setPressed(true);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isPressed) {
      const isStart = isStartPoint({ x: col, y: row });
      const isEnd = isEndPoint({ x: col, y: row });

      setBlock(col, row, isStart, isEnd);
    }
  };

  const handleMouseUp = () => {
    setPressed(false);
  };

  const hasBomb = (row: number, col: number): boolean => {
    return levels[level].bombs?.includes(`${col}.${row}`) ?? false;
  };

  return (
    <main className="flex flex-col items-center justify-between p-4 md:p-24">
      <div className="text-center mb-4">
        <h1>The Maze Game.</h1>
        <h2>
          <strong>Goal:</strong> Set the blocks so that the steps to achieve the
          goal meet the requirements.
        </h2>
      </div>

      {!initialLoad && (
        <div className="flex items-center justify-center h-96 w-full">
          <h2>Loading your level...</h2>
        </div>
      )}

      {initialLoad && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="w-full md:w-fit"
        >
          {!finish && (
            <Fragment>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-2">
                <p>
                  <strong>Current level: {level}</strong>
                </p>
                <p>
                  <strong>
                    <span
                      className={
                        levels[level].exactSteps
                          ? 'text-blue-600 underline decoration-blue-600'
                          : 'text-orange-600 underline decoration-orange-600'
                      }
                    >
                      {levels[level].exactSteps
                        ? 'Exact steps'
                        : 'Minimum steps'}
                    </span>{' '}
                    to pass level: {levels[level].steps}
                  </strong>
                </p>
              </div>
              <div className="text-center mb-4">
                <p className="mb-2">
                  <strong>Current steps: {steps}</strong>
                </p>
                {result !== undefined && (
                  <Fragment>
                    {result.success && (
                      <p className="text-green-600">
                        <strong>{result.message}</strong>
                      </p>
                    )}
                    {!result.success && (
                      <p className="text-red-700">
                        <strong>{result.message}</strong>
                      </p>
                    )}
                  </Fragment>
                )}
              </div>
            </Fragment>
          )}

          {finish && (
            <div className="flex flex-col items-center w-full mb-4">
              <p className="text-orange-600 mb-2">
                <strong>
                  You have finished all levels for now. Congratulations :)
                </strong>
              </p>
              <button
                onClick={() => {
                  setLevel(0);
                  window.localStorage.setItem('maze-lv', String(0));
                  setFinish(false);
                }}
                className="bg-orange-600 text-white rounded-md py-2 px-4"
              >
                Play again
              </button>
            </div>
          )}

          <div>
            <div className="flex flex-col items-center border-b-[1px] border-zinc-200 mb-4">
              <div className="flex items-center gap-2 px-[1.5125rem] py-1">
                <HiCursorClick size={16} />
                <p className="flex items-center">
                  Click&nbsp;
                  <span className="hidden md:block">
                    or press down and slide&nbsp;
                  </span>
                  to set or remove a block
                </p>
              </div>
              <div className="flex items-center gap-2 px-[1.5125rem] py-1">
                <FaBomb size={16} className="hidden md:block text-red-500" />
                <div className="md:hidden h-4 w-4 bg-red-800"></div>
                <p>Don&#39;t touch the bombs</p>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-fit">
                <button
                  onClick={async () => {
                    clearAllTimeouts();

                    setSteps(0);

                    var elems = document.querySelectorAll('.path');

                    [].forEach.call(elems, function (el: any) {
                      el.classList.remove('path');
                    });

                    const path = astar.findPath(
                      levels[level].start,
                      levels[level].end
                    );

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
                          message:
                            'Successfully cleared level! Loading new level.',
                        });

                        setTimeout(() => {
                          var elems = document.querySelectorAll('.path');

                          [].forEach.call(elems, function (el: any) {
                            el.classList.remove('path');
                          });

                          setMatrix(
                            new Array(15)
                              .fill(0)
                              .map(() => new Array(20).fill(0))
                          );
                          setSteps(0);

                          if (!levels[level + 1]) {
                            setFinish(true);
                            setResult(undefined);
                          } else {
                            setLevel((state) => state + 1);

                            window.localStorage.setItem(
                              'maze-lv',
                              String(level + 1)
                            );

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
                            message =
                              'Not exact steps reached. Try agaainnn :D';
                          } else
                            message = 'Not enough steps reached! Try again :p';

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
                    setMatrix(
                      new Array(15).fill(0).map(() => new Array(20).fill(0))
                    )
                  }
                  className="flex items-center gap-2 px-[1.5125rem] py-1"
                >
                  <MdClearAll size={16} />
                  <p>Clear all blocks</p>
                </button>
              </div>
            </div>
            <div
              ref={mazeRef}
              className="grid grid-cols-20 md:w-[40rem] touch-none border-t-[1px] border-l-[1px] border-zinc-900"
            >
              {matrix.map((row: number[], i) => {
                return row.map((value, j) => {
                  const isStart = isStartPoint({ x: j, y: i });
                  const isEnd = isEndPoint({ x: j, y: i });

                  return (
                    <div
                      id={`cell-${j}-${i}`}
                      key={j}
                      onClick={() => setBlock(j, i, isStart, isEnd)}
                      onMouseDown={handleMouseDown}
                      onMouseEnter={() => handleMouseEnter(i, j)}
                      onMouseUp={handleMouseUp}
                      className={`relative py-[50%] w-full border-zinc-900
          ${j !== 39 ? 'border-r-[1px]' : ''}
          ${i !== 17 ? 'border-b-[1px]' : ''}
          ${
            hasBomb(i, j)
              ? 'bg-red-800 md:bg-zinc-300'
              : value === 1
              ? 'bg-zinc-900'
              : 'bg-zinc-300'
          }
          ${isStart ? 'start' : isEnd ? 'goal' : 'cursor-pointer'} 
          
          `}
                    >
                      {hasBomb(i, j) && (
                        <div className="hidden md:block absolute top-0 right-0 translate-x-[-50%] translate-y-[50%]">
                          <FaBomb size={16} className="text-red-500" />
                        </div>
                      )}
                    </div>
                  );
                });
              })}
            </div>
          </div>
        </motion.div>
      )}
    </main>
  );
}
