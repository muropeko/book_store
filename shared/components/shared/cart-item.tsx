'use client';

import React, { FC } from 'react';
import { cn } from 'shared/lib/utils';
import { CartItemWithDetails } from 'prisma/types';
import { unknownCover } from './book-card';
import { mapBookFormat, mapBookLanguage } from 'constants/book';
import { Trash2 } from 'lucide-react';
import { DiscountType } from '@prisma/client';
import { discountMap } from 'shared/lib/calc-discount';
import { CounterQuantity } from './counter-quantity';
import { PriceLabel } from './price-label';
import { useCart } from 'shared/store/cart';

interface Props {
  className?: string;
  item: CartItemWithDetails;
  deleteCartItem?: (cartItemId: number) => void;
  isStatic?: boolean;
}

export const calcPriceWithDiscount = (
  discount: DiscountType | null,
  price: number,
  quantity: number
) => {
  const discountPercent = discount ? discountMap[discount] : 0;
  const priceWithDiscount = price * (1 - discountPercent / 100);
  return quantity * priceWithDiscount;
};

export const CartItem: FC<Props> = ({
  className,
  item,
  deleteCartItem,
  isStatic = false,
}) => {
  const { addItem, subtractItem } = useCart();

  return (
    <div className={cn('flex justify-between relative items-center gap-6 mb-6', className)}>
      {!isStatic && deleteCartItem && (
          <Trash2
            strokeWidth={1.5}
            size={20}
            onClick={() => deleteCartItem(item.id)}
            className="hover:text-red-600 transition duration-300 cursor-pointer absolute right-0 top-0"
          />
        )}
      <div className="flex gap-6">
        <div className="">
          <img
            src={item.bookItem.book.coverUrl || unknownCover}
            alt={item.bookItem.book.title || 'Book cover'}
            className="h-[130px] w-[90px] object-cover rounded"
          />
        </div>

        <div className="flex flex-col justify-between">
          <p className="font-semibold text-lg">{item.bookItem.book.title}</p>
          <p className="text-gray-500 text-sm">
            {item.bookItem.book.author?.firstName} {item.bookItem.book.author?.lastName}
          </p>

          <div className="grid grid-cols-[120px_1fr] gap-y-1 text-sm text-gray-600 mt-4 self-start">
            <span className="font-medium">Формат:</span>
            <span>{mapBookFormat[item.bookItem.format]}</span>

            <span className="font-medium">Мова:</span>
            <span>{mapBookLanguage[item.bookItem.language]}</span>

            <span className="font-medium">Видавництво:</span>
            <span>{item.bookItem.book.publisher?.name || '-'}</span>
          </div>

        </div>
      </div>

      {/* Права частина: ціна + кнопка видалення */}
      <div className="flex flex-col items-end ">
        <div className="flex items-center gap-2  justify-end">
            <span className="text-lg font-bold text-gray-900">₴{item.bookItem.price}</span>
            <span className="text-sm text-gray-500">×{item.quantity}</span>
        </div>
        { !isStatic && (
          <CounterQuantity
            quantity={item.quantity}
            addQuantity={() => addItem(item.bookItem.id, 1)}
            subtractQuantity={() => subtractItem(item.bookItem.id, 1)}
          />
        )}
        
      </div>
    </div>
  );
};
