import { Fragment } from 'react';

interface LoaderProps {
  initialLoad: boolean;
}

export const Loader = ({ initialLoad }: LoaderProps) => {
  return (
    <Fragment>
      {!initialLoad && (
        <div className="flex items-center justify-center h-96 w-full">
          <h2>Loading your level...</h2>
        </div>
      )}
    </Fragment>
  );
};
