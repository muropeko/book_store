'use client';
import { useEffect } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { CartItem } from './cart-item';
import { EmptyBlock } from './empty-block';
import { SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@components/ui/sheet';
import { Button } from '@components/ui';
import { useCart } from 'shared/store/cart';
import { Loader } from './loader';
import { useRouter } from 'next/navigation';

export const CartSheet = () => {
  const { cart, loading, removeItem, loadCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <SheetContent className="bg-white flex flex-col h-full overflow-hidden">
      <SheetHeader className="p-4">
        <SheetTitle>Кошик</SheetTitle>
      </SheetHeader>

      <ScrollArea.Root className="flex-1 min-h-0">
        <ScrollArea.Viewport className="w-full p-4 h-full">
         {loading ? (
            <Loader />
          ) : cart && cart.items.length > 0 ? (
            cart.items.map((i) => (
              <CartItem key={i.id} item={i} deleteCartItem={removeItem} />
            ))
          ) : (
            <div className="flex-1 absolute inset-0 flex flex-col justify-center items-center h-full">
              <EmptyBlock
                title="Пусто!"
                description="Додайте щось у кошик :)"
                className="flex-1"
              />
            </div>
          )}

        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical" className="w-2">
          <ScrollArea.Thumb className="block rounded-full bg-neutral-400/70" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

      <SheetFooter className="">



<div className="p-4 border-t flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Разом:</span>
        <span className="text-2xl font-bold text-gray-900">
          ₴{cart?.totalAmount ?? 0}
        </span>
      </div>

      <Button 
            disabled={!cart?.items.length}
            onClick={() => router.replace('/checkout')}

      className="w-full py-3 rounded-2xl bg-black text-white font-medium hover:bg-gray-800 transition">
        Оформити замовлення
      </Button>
    </div>

      </SheetFooter>
    </SheetContent>
  );
};
