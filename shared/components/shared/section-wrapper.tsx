import React, { FC, PropsWithChildren } from 'react';
import { cn } from 'shared/lib/utils';
import { Container } from './container';
import { TitleWithUnderline } from './title-with-underline';

interface Props {
    className?: string;
    sectionTitle: string;
    children: React.ReactNode;
}

export const SectionWrapper: FC<PropsWithChildren<Props>> = ({ className, sectionTitle, children }) => {
  return (
    <div className={cn('', className)}>
      <Container className='py-[40px]'>
        <TitleWithUnderline text={sectionTitle} />
        {children}
      </Container>
    </div>
  );
};
