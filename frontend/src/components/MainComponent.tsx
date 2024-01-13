import { FormComment } from '../components/FormComment';
import { CommentList } from '../components/CommentList';
import { useState } from 'react';
import { Comment } from '../types';

export const MainComponent = () => {
  // [
  //   {
  //     uuid: 'U0284R08WEUJF',
  //     email: 'hg.avalosc97@gmail.com',
  //     comment: 'This is a brief comment left by Hector Avalos',
  //   }
  // ]
  const [comments, setComments] = useState<Comment[]>([]);

  // useEffect(() => {
  //   setComments([] as Comment[]);
  // }, []);

  return (
    <>
      <FormComment />
      {comments.length && <CommentList comments={comments} />}
    </>
  );
};
