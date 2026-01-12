import React from 'react';
import { CommentWithUser } from 'prisma/types';
import { TabCommentItem } from './tab-comment-item';
import { EmptyBlock } from '../empty-block';

interface Props {
  className?: string;
  comments: CommentWithUser[];
}

export const TabComments = ({ className, comments}: Props) => {

  return (
    <div className={className ?? ''}>
      { comments.length 
          ? comments.map(c => <TabCommentItem item={c} key={c.id} />) 
          : <EmptyBlock title='Пусто!' description='Ви можете залишити тут перший коментар.'/>
      }
    </div>
  );
};
