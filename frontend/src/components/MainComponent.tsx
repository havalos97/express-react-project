import { useEffect } from 'react';
import { FormComment } from '../components/FormComment';
import { CommentList } from '../components/CommentList';
import axios from 'axios';
import { useCommentsContext } from '../hooks/useComment';

export const MainComponent = () => {
  const { comments, setComments } = useCommentsContext();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/comments`)
      .then(({ data }) => {
        Array.isArray(data) && setComments(data);
      });
  }, []);

  return (
    <>
      <FormComment />
      {comments.length && <CommentList />}
    </>
  );
};
