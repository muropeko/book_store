'use client';

import React, { FC } from "react";
import { BookDetalisedWithDiscount } from "shared/lib/calc-discount";
import { BookItemOption } from "./book-item-option";
import { BookFormat, BookLanguage } from "constants/book";
import { CounterQuantity } from "./counter-quantity";
import { BookItemWithDiscount } from "prisma/types";
import { InfoRow } from "./info-row";
import { useCartQuantity } from "shared/hooks";
import { calcPriceWithDiscount } from "./cart-item";

interface Props {
  className?: string;
  item: BookDetalisedWithDiscount;
  currentBook: BookItemWithDiscount | null;
  format: BookFormat;
  setFormat: (f: BookFormat) => void;
  language: BookLanguage;
  setLanguage: (l: BookLanguage) => void;
  availableFormats: { name: string; value: number }[];
  availableLanguages: { name: string; value: number }[];
  quantity: number;
  addQuantity: () => void;
  subtractQuantity: () => void;
}

export const BookItemInfo: FC<Props> = ({
  className,
  item,
  currentBook,
  format,
  setFormat,
  language,
  setLanguage,
  availableFormats,
  availableLanguages,
  quantity, addQuantity, subtractQuantity
}) => {

  return (
    <div className={`grid grid-cols-[150px_1fr] gap-y-3 ${className ?? ""}`}>
      <InfoRow
        label="Автор:"
        value={`${item.author?.firstName} ${item.author?.lastName}`}
        type="link"
        linkHref={`/authors/${item.author?.id}`}
      />

      <InfoRow
        label="Жанр:"
        value={item.category?.name ?? "—"}
        type='link'
        linkHref={`/category/${item.category?.id}`}
      />

      <InfoRow
        label="Видавництво:"
        value={item.publisher?.name ?? "—"}
        type='link'
        linkHref={`/publishers/${item.publisher?.id}`}
      />

      
      <InfoRow 
        label="Формат:" 
        value={<BookItemOption isActive={format} options={availableFormats} onClick={(v) => setFormat(v as BookFormat)} />} 
        type='component' 
      />
      
      <InfoRow 
        label="Мова:" 
        value={<BookItemOption isActive={language} options={availableLanguages} onClick={(v) => setLanguage(v as BookLanguage)} />} 
        type='component' 
      />
      
      <InfoRow 
        label="Кількість:" 
        value={<div className="flex items-center gap-4">
          <CounterQuantity
            subtractQuantity={subtractQuantity}
            addQuantity={addQuantity}
            quantity={quantity}
          />

        </div>} 
        type='component' 
      />
      
      <InfoRow 
        label="Доступно:" 
        value={currentBook?.stock ?? 0} 
      />
      
      <InfoRow
        label="Ціна:"
        value={
          (currentBook?.priceWithDiscount ?? currentBook?.price ?? 0) * (quantity ?? 0)
        }
      />


    </div>
  );
};
