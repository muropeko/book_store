import React, { FC, PropsWithChildren } from 'react';
import { cn } from 'shared/lib/utils';

interface Props {
    className?: string;
}

export const Container: FC<PropsWithChildren<Props>> = ({ className, children }) => {
  return (
    <div className={cn('w-full mx-auto max-w-[1480px] flex-1 px-5', className)}>
      {children}
    </div>
  );
};


