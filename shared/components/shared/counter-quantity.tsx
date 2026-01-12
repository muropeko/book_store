'use client';

import React from 'react';
import { cn } from 'shared/lib/utils';
import { CounterButton } from './counter-button';

interface Props {
  className?: string;
  quantity: number;
  addQuantity: () => void | Promise<void>;
  subtractQuantity: () => void | Promise<void>;
}


export const CounterQuantity = ({
  className,
  quantity,
  addQuantity,
  subtractQuantity
}: Props) => {
  return (
    <div className={cn('flex items-center gap-[5px]', className)}>
      <CounterButton type="minus" onClick={subtractQuantity} />
      <span className="p-[3px] text-center text-lg font-semibold text-red-700">
        {quantity}
      </span>
      <CounterButton type="plus" onClick={addQuantity} />
    </div>
  );
};
