import React, { FC } from 'react';
import { BookCard } from './book-card';
import Link from 'next/link';
import { BookWithAuthor, BookWithAuthorAndDiscount } from 'prisma/types';
import { EmptyBlock } from './empty-block';

interface Props {
  className?: string;
  items: BookWithAuthorAndDiscount[];
}

export const BookList: FC<Props> = ({ className, items }) => {
  const hasItems = items.length > 0

  return (
    <div
      className={`${
        hasItems
          ? "flex flex-wrap gap-10"
          : "flex items-center justify-center h-[100%]"
      } ${className}`}
    >
      {hasItems ? (
        items.map((i) => (
          <Link key={i.id} href={`/books/${i.id}`}>
            <BookCard item={i} />
          </Link>
        ))
      ) : (
        <EmptyBlock
          title="Нічого не знайдено!"
          description="Спробуйте обрати інші фільтри."
        />
      )}
    </div>
  )
}
