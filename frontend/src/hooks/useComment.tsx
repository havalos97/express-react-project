import { createContext, useContext, useState } from 'react';
import { Comment } from '../types';

type Dispatch <T> = React.Dispatch<React.SetStateAction<T>>;

type CommentsContextType = {
  comments: Comment[];
  setComments: Dispatch<Comment[]>;
  pushComment: (comment: Comment) => void;
  deleteComment: (commentUuid: string) => void
};

export const CommentsContext = createContext<CommentsContextType>(
  {} as CommentsContextType
);

export const CommentsContextProvider = ({ children }: { children: JSX.Element }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const pushComment = (comment: Comment) =>
    setComments([...comments, comment]);

  const deleteComment = (commentUuid: string) =>
    setComments(comments.filter((comment) => comment.uuid !== commentUuid));

  return (
    <CommentsContext.Provider value={{ comments, setComments, pushComment, deleteComment }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentsContext = () => {
  return useContext(CommentsContext);
};
