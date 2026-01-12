import { BookItem, DiscountType, Prisma } from "@prisma/client";

export type BookWithAuthor = Prisma.BookGetPayload<{
  include: {author: true, items: true}
}>;

export type BookWithAuthorAndDiscount = Omit<BookWithAuthor, 'items'> & {
  items: BookItemWithDiscount[];
};


type BookItemBase = BookItem & { book: { discount: DiscountType | null } };
export type BookItemWithDiscount = BookItemBase & {
  priceWithDiscount: number | null;
};


export type BookDetalised = Prisma.BookGetPayload<{
  include: {
    author: true;
    items: true;
    publisher: true;
    category: true;
    comments: {
      include: {
        user: true;
      };
    };
    
  };
}>;

export type CommentWithUser = Prisma.CommentGetPayload<{
  include: {user: true}
}>;

export type CategoryWithBooks = Prisma.CategoryGetPayload<{
  include: {books: true}
}>


export type CartWithItems = Prisma.CartGetPayload<{
  include: {items: {
    include: {
      bookItem: {
          include: {
            book: {
              include: {
                author: true
                
              }
            }
          }
        } 
    }
  }}
}>

export type CartItemWithDetails = Prisma.CartItemGetPayload<{
  include: {
      bookItem: {
          include: {
            book: {
              include: {
                author: true
              }
            },
          }
        },
    }
}>