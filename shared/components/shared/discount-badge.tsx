import { DiscountType } from '@prisma/client';
import React from 'react';
import { discountMap } from 'shared/lib/calc-discount';
import { cn } from 'shared/lib/utils';

interface Props {
    className?: string;
    discount: DiscountType
}

export const DiscountBadge = ({ className, discount }: Props) => {
    return (
        <div className={cn(className, 'absolute bg-red-600 text-white px-3 py-1 left-0 m-3')}>
            {discountMap[discount]}%
        </div>
    );
};

