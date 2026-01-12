import React, { FC } from 'react';
import { Title } from './title';
import { BookWithAuthor, BookWithAuthorAndDiscount } from 'prisma/types';
import { PriceLabel } from './price-label';
import { DiscountBadge } from './discount-badge';

interface Props {
  className?: string;
  item: BookWithAuthorAndDiscount
}

export const unknownCover = 'https://ksd.ua/storage/products/gallery/medium_x2/ARcbmItxWG32P9hLv0qsSWU8SJsqq9U19I2K893h.jpg.webp?v=1751439275'

export const BookCard: FC<Props> = ({ className, item }) => {
  return (
    <div className='flex flex-col items-center relative group w-[325px]'>
        {item.discount && <DiscountBadge discount={item.discount} />}
        
        <img 
            src={item.coverUrl || unknownCover}
            className='h-[480px]'
            alt='cover' 
        />
        <div className='flex flex-col mt-[30px] items-center gap-2'>
            <p className='uppercase text-gray-500'>{item.author?.firstName} {item.author?.lastName}</p>
            <Title text={item.title} className='group-hover:text-red-600 transition duration-300 text-center'/>
            <PriceLabel 
              price={item.items[0].price}  
              discount={item.items[0].priceWithDiscount || undefined} 
              labelSize="sm" 
            />            
        </div>
    </div>
  )
};

