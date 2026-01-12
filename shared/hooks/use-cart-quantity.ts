import { useState, useEffect } from "react";

interface Props {
  currentBookId: number;
  stock: number;
}

interface ReturnProps {
  quantity: number;
  addCartItem: () => void;
  subtractCartItem: () => void;
  resetQuantity: () => void;
}

export const useCartQuantity = ({ stock, currentBookId }: Props): ReturnProps => {
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    setQuantity(1);
  }, [currentBookId]);

  useEffect(() => {
    console.log('testing.', quantity)
  }, [quantity])

  const addCartItem = () => setQuantity(prev => Math.min(prev + 1, stock));
  const subtractCartItem = () => setQuantity(prev => Math.max(prev - 1, 1));
  const resetQuantity = () => setQuantity(1);

  return { quantity, addCartItem, subtractCartItem, resetQuantity };
};
