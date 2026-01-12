import { Comment } from '@prisma/client';
import { Star } from 'lucide-react';
import { Span } from 'next/dist/trace';
import Link from 'next/link';
import { CommentWithUser } from 'prisma/types';
import { FC, useMemo } from 'react';

interface Props {
  className?: string;
  item: CommentWithUser;
}

export const TabCommentItem: FC<Props> = ({ className, item }) => {
    const totalStars = 5;
    const stars = useMemo(() => {
      return [...Array(totalStars)].map((_, i) => (
        <Star
          key={i}
          fill={i < (item.rating ?? 0) ? "#ffab1a" : "none"}
          color={i < (item.rating ?? 0) ? "#ffab1a" : "#ccc"}
          strokeWidth={2.25}
          size={18}
        />
      ));
    }, [totalStars, item.rating]);


  return (
    <div className={`border-b border-stone-300 mx-[120px] py-5 ${className}`}>
      <div className="flex items-center justify-between">
        <p className='flex items-center gap-1'>{stars}</p>
        <p className='text-stone-500 text-sm'>{new Date(item.createdAt).toLocaleString()}</p>
      </div>
      <Link 
          href={`/profile/${item.userId}`}
          className='hover:text-red-600 transition duration-300'
      >
        {item.user ? `${item.user.firstName} ${item.user.lastName}` : 'Анонім'}
      </Link>
      <p>{item.content}</p>
    </div>
  );
};
