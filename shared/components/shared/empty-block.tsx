import React from 'react';
import { Title } from './title';
import Link from 'next/link';
import { Button } from '@components/ui';
import { cn } from 'shared/lib/utils';

interface Props {
    className?: string;
    title: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
}

// EmptyBlock.tsx
export const EmptyBlock = ({ className, title, description, actionHref, actionLabel }: Props) => {
  return (
    <div className={cn(className, "flex flex-col justify-center items-center h-full")}>
      <Title text={title} size="lg" />
      {description && <p className="text-stone-500 mt-1">{description}</p>}
      {actionLabel && actionHref && (
        <Button className="mt-10">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
};
