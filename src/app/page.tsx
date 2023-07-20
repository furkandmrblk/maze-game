'use client';

import { useEffect, useRef, useState } from 'react';
import { levels } from '@/utils/levels';
import { motion } from 'framer-motion';
import { FaBomb } from 'react-icons/fa';
import { Title } from '@/components/Title/Title';
import { Loader } from '@/components/Loader/Loader';
import { LevelInformation } from '@/components/LevelInformation/LevelInformation';
import { Navbar } from '@/components/Navbar/Navbar';
import { GameInformation } from '@/components/GameInformation/GameInformation';
import { GameActions } from '@/components/GameActions/GameActions';

// TODO: More levels
// TODO: FEATURE: Unmovable gray walls

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

  const blockColor = (i: number, j: number, value: number) => {
    return hasBomb(i, j)
      ? 'bg-red-800 md:bg-zinc-300'
      : value === 1
      ? 'bg-zinc-900'
      : 'bg-zinc-300';
  };

  return (
    <section>
      <Navbar />
      <main className="flex flex-col items-center justify-between p-4">
        <Title />

        <Loader initialLoad={initialLoad} />

        {initialLoad && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="w-full md:w-fit"
          >
            <LevelInformation
              {...{ level, setLevel, finish, setFinish, result, steps }}
            />

            <div>
              <div className="flex flex-col items-center border-b-[1px] border-zinc-200 mb-4">
                <GameInformation />
                <GameActions
                  {...{
                    hasBomb,
                    level,
                    setLevel,
                    matrix,
                    setMatrix,
                    setFinish,
                    setResult,
                    setSteps,
                  }}
                />
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
          ${blockColor(i, j, value)}
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
    </section>
  );
}
