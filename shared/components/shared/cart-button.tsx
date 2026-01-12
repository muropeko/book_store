'use client';
import { Sheet, SheetTrigger } from '@components/ui/sheet';
import { ShoppingCart } from 'lucide-react';
import { CartSheet } from './cart-sheet';
import { useState } from 'react';

interface Props {
  className?: string;
}

export const CartButton = ({className}: Props) => {
  const [cartOpen, setCartOpen] = useState(false);


  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetTrigger asChild>
        <ShoppingCart className={className} onClick={() => setCartOpen(true)}/>
      </SheetTrigger>
      <CartSheet />
    </Sheet>
  );
};
