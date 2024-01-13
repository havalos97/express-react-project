import { useEffect } from 'react';
import { FormComment } from '../components/FormComment';
import { CommentList } from '../components/CommentList';
import { useCommentsContext } from '../hooks/useComment';
import { getAllComments } from '../api/comments.requests';

export const MainComponent = () => {
  const { comments, setComments } = useCommentsContext();

  useEffect(() => {
    getAllComments().then(({ data }) =>
      Array.isArray(data) && setComments(data)
    );
  }, []);

  return (
    <>
      <FormComment />
      {comments.length && <CommentList />}
    </>
  );
};
