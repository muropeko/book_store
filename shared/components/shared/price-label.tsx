import React, { FC } from 'react';
import { cn } from 'shared/lib/utils';

interface Props {
  className?: string;
  price?: number;
  discount?: number;
  labelSize: 'sm' | 'lg';
}

export const PriceLabel: FC<Props> = ({ className, price = 0, discount, labelSize }) => {
  const size = {
    lg: { main: 'text-[26px]', old: 'text-[18px]', gap: 'gap-5' },
    sm: { main: 'text-[18px]', old: 'text-[15px] font-medium', gap: 'gap-3' },
  } as const;

  const hasDiscount = discount !== undefined && discount !== price;

  return (
    <div className={cn(className, `flex ${size[labelSize].gap} items-center`)}>
      <p className={`text-gray-500 ${size[labelSize].main}`}>
        ₴{hasDiscount ? discount : price}
      </p>
      {hasDiscount && (
        <p className={`text-gray-400 line-through text-[16px] ${size[labelSize].old}`}>
          ₴{price}
        </p>
      )}
    </div>
  );
};
