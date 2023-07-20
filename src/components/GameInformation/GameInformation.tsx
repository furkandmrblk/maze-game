import { Fragment } from 'react';
import { FaBomb } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';

export const GameInformation = () => {
  return (
    <Fragment>
      <div className="flex items-center gap-2 px-[1.5125rem] py-1">
        <HiCursorClick size={16} />
        <p className="flex items-center">
          Click&nbsp;
          <span className="hidden md:block">or press down and slide&nbsp;</span>
          to set or remove a block
        </p>
      </div>
      <div className="flex items-center gap-2 px-[1.5125rem] py-1">
        <FaBomb size={16} className="hidden md:block text-red-500" />
        <div className="md:hidden h-4 w-4 bg-red-800"></div>
        <p>Don&#39;t touch the bombs</p>
      </div>
    </Fragment>
  );
};
