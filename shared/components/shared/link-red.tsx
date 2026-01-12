import React, { FC } from 'react';
import Link from 'next/link';
import { cn } from 'shared/lib/utils';

interface Props {
  className?: string;
  path: string;
  withText?: boolean;
  children: React.ReactNode;
}

export const LinkRed: FC<Props> = ({ className, children, path, withText = false }) => {
  return (
    <Link 
        href={path}
        className={cn(
            'hover:text-red-600',
            withText && 'hover:underline hover:text-red-600',
            className
        )}
    >
        {children}
    </Link>
  );
};
