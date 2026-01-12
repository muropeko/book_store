import React, { FC } from 'react';

interface Props {
  className?: string;
}

export const BookSidebar: FC<Props> = ({ className }) => {

  return (
    <div className='bg-blue-300'>
        sidebar
    </div>
  )
};

