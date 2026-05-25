import React, { FC, PropsWithChildren } from 'react';
import { cn } from 'shared/lib/utils';
import { Container } from './container';

interface Props {
    className?: string;
}

export const Footer: FC<Props> = ({ className }) => {
  return (
    <footer className={cn("bg-stone-800 py-[80px] text-white", className)}>
      <Container></Container>
    </footer>
  );
};
