import { levels } from '@/utils/levels';
import { Dispatch, Fragment, SetStateAction } from 'react';

interface LevelInformationProps {
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
  finish: boolean;
  setFinish: Dispatch<SetStateAction<boolean>>;
  steps: number;
  result:
    | {
        success: boolean;
        message: string;
      }
    | undefined;
}

export const LevelInformation = ({
  level,
  setLevel,
  finish,
  setFinish,
  steps,
  result,
}: LevelInformationProps) => {
  return (
    <Fragment>
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
                  {levels[level].exactSteps ? 'Exact steps' : 'Minimum steps'}
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
    </Fragment>
  );
};
