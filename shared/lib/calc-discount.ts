import { BookItem, DiscountType } from "@prisma/client";
import { BookDetalised } from "prisma/types";

export const discountMap: Record<DiscountType, number> = {
  [DiscountType.SMALL5]: 5,
  [DiscountType.SMALL10]: 10,
  [DiscountType.MEDIUM15]: 15,
  [DiscountType.MEDIUM20]: 20,
  [DiscountType.MEDIUM25]: 25,
  [DiscountType.LARGE30]: 30,
  [DiscountType.LARGE40]: 40,
  [DiscountType.LARGE50]: 50,
};

export type BookItemWithDiscount = BookItem & { priceWithDiscount: number | null };
export type BookDetalisedWithDiscount = Omit<BookDetalised, 'items'> & {
  items: BookItemWithDiscount[]
};

export const applyDiscountToBook = (book: BookDetalised): BookDetalisedWithDiscount => {
  const discountPercent = book.discount ? discountMap[book.discount] : 0;

  return {
    ...book,
    items: book.items.map(item => ({
      ...item,
      priceWithDiscount: discountPercent
        ? Math.round(item.price * (1 - discountPercent / 100))
        : null
    }))
  };
};

export const applyDiscountToBooks = (books: BookDetalised[]): BookDetalisedWithDiscount[] =>
  books.map(applyDiscountToBook);
