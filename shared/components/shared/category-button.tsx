'use client';

import { Category } from '@prisma/client';
import React, { FC } from 'react';
import { useFilter } from 'shared/hooks';

import { cn } from 'shared/lib/utils';

interface Props {
  className?: string;
  items: Category[];
}

export const CategoryButton: FC<Props> = ({ className, items }) => {
  const { filters, setFilters } = useFilter()

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {items.map((i) => {
        const isActive = i.id === filters.categoryId;

        return (
            <button
              key={i.id}
              onClick={() => setFilters({categoryId: i.id})}
              className={cn(
                'p-3 font-medium transition-colors duration-200 shadow-[0_10px_20px_#00000030,0_6px_6px_#0000003b]',
                isActive
                  ? 'bg-red-600 text-white border-red-600'
                  : 'hover:bg-red-400 hover:text-stone-600 cursor-pointer'
              )}
              disabled={isActive}
            >
              {i.name}
            </button>

        );
      })}
    </div>
  );
};

