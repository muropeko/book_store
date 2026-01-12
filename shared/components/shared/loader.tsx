import React from 'react';

interface LoaderProps {
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className = '' }) => {
  return (
    <div className='absolute inset-0 flex justify-center items-center'>
      <div
        className="h-[60px] w-[60px]
        animate-spin rounded-full border-8 border-solid
        border-current border-r-transparent
        motion-reduce:animate-[spin_1.5s_linear_infinite]
        text-red-600"
      />
    </div>
  );
};
