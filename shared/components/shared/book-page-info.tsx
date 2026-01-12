'use client';

import React, { useEffect, useState } from 'react';
import { Title } from './title';
import { BookItemInfo } from './book-item-info';
import { PriceLabel } from './price-label';
import { Button } from '@components/ui';
import { useCartQuantity, useSelectBook } from 'shared/hooks';
import { BookDetalisedWithDiscount } from 'shared/lib/calc-discount';
import { addCartItem, fetchCart } from 'app/actions';
import { useCart } from 'shared/store/cart';

interface Props {
  className?: string;
  item: BookDetalisedWithDiscount;
}

const unknownCover = 'https://ksd.ua/storage/products/gallery/medium_x2/ARcbmItxWG32P9hLv0qsSWU8SJsqq9U19I2K893h.jpg.webp?v=1751439275'

export const BookPageInfo = ({ className, item }: Props) => {
  const {
    currentBook,
    format,
    setFormat,
    language,
    setLanguage,
    availableFormats,
    availableLanguages
  } = useSelectBook(item.items);

  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setQuantity(1);
  }, [currentBook?.id]);

  const addQuantity = () => setQuantity(prev => Math.min(prev + 1, currentBook?.stock ?? 1));
  const subtractQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  const handleAddBook = () => {
    addItem(currentBook!.id, quantity);
    setQuantity(1);

  }
  

  return (
    <div className='flex gap-[80px] flex-1'>
      <img
        src={item.coverUrl || unknownCover}
        className='h-[550px]'
        alt='cover'
      />
      <div className='flex flex-col gap-3'>
        <Title text={item.title} size='xl' className='leading-none' />
        {item.author?.bio && <p>Про автора: {item.author.bio}</p>}

        <PriceLabel
          price={currentBook?.price ?? 0}
          discount={currentBook?.priceWithDiscount ?? currentBook?.price ?? 0}
          labelSize="lg"
        />

        <BookItemInfo
          item={item}
          currentBook={currentBook}
          format={format}
          setFormat={setFormat}
          language={language}
          setLanguage={setLanguage}
          availableFormats={availableFormats}
          availableLanguages={availableLanguages}
          quantity={quantity}
          addQuantity={addQuantity}
          subtractQuantity={subtractQuantity}
        />

        <div className="flex flex-col gap-6 py-5 w-[500px]">
          <div className="flex gap-6">
            <Button 
              className="capitalize flex-1"
              onClick={handleAddBook}
              >Додати до кошика</Button>
            <Button className="capitalize flex-1">Додати до бажаного</Button>
          </div>
          <Button className="capitalize">купити зараз</Button>
        </div>
      </div>
    </div>
  );
};
