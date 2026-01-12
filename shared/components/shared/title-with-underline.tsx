import React, { FC } from 'react';
import { Title } from './title';

interface Props {
  className?: string;
  text: string;
}

export const TitleWithUnderline: FC<Props> = ({ className, text }) => {
  return (
    <div className=''>
      <Title text={text} size='md' className='uppercase text-center' />
      <span className="block h-[4px] w-[80px] bg-red-600 mt-2 mx-auto mb-[40px]" />
    </div>
  );
};

