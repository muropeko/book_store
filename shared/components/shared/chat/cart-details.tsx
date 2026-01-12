import { Cart } from ".prisma/client/client";
import { CartItem } from "../cart-item";
import { CartItemWithDetails } from "prisma/types";
import { EmptyBlock } from "../empty-block";

interface CartDetailsProps {
  cart: Cart & { items: CartItemWithDetails[] };
}

export const CartDetails = ({ cart }: CartDetailsProps) => {
  if (!cart.items || cart.items.length === 0) {
    return <EmptyBlock title='Пустий кошик'/>;
  }

  return (
    <div className="p-4 border-b overflow-y-auto flex flex-col gap-4">
      {cart.items.map((c) => (
        <CartItem key={c.id} item={c} isStatic/>
      ))}
    </div>
  );
};
