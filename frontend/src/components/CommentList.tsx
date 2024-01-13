import { Comment } from './Comment';
import { Comment as CommentType } from '../types';

type CommentListProps = {
  comments: CommentType[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  if (!comments.length) return null;

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
