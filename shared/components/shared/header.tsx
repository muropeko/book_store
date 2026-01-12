'use client';

import React, { FC, PropsWithChildren } from 'react';
import { cn } from 'shared/lib/utils';
import { Container } from './container';
import { HeartPlus, Search, User } from 'lucide-react';
import { CartButton } from './cart-button';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
}

export const Header: FC<PropsWithChildren<Props>> = ({ className }) => {
  const router = useRouter();

  return (
    <header className={cn('py-11', className)}>
      <Container className='flex align-center justify-between'>
        <div className='flex align-center gap-4'>
          <CartButton 
            className='hover:text-red-600 transition duration-300 cursor-pointer'
          />

          <HeartPlus 
            size={20}
            onClick={() => router.push('/')}
            className='hover:text-red-600 transition duration-300 cursor-pointer'
          /> 
        </div>
        <img src='https://bookly-theme.myshopify.com/cdn/shop/files/logo_png.png?v=1620028660&width=420'/>
        <div className='flex align-center gap-4'>
          <User 
            size={20}
            onClick={() => router.push('/profile')}
            className='hover:text-red-600 transition duration-300 cursor-pointer'
          />

          <Search 
            size={20}
            onClick={() => router.push('/profile')}
            className='hover:text-red-600 transition duration-300 cursor-pointer'
          />
        </div>
      </Container>
    </header>
  )
};
