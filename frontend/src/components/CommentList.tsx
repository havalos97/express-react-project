import { FC } from 'react';
import { Comment } from './Comment';
import { useCommentsContext } from '../hooks/useComment';

export const CommentList: FC = () => {
  const { comments } = useCommentsContext();

  return (
    <>
      {
        comments.map((comment) => (
          <Comment
            key={comment.uuid}
            uuid={comment.uuid}
            email={comment.email}
            comment={comment.comment}
          />
        ))
      }
    </>
  );
};
