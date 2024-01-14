import { render, screen, waitFor } from '@testing-library/react';
import { CommentsContext, CommentsContextProvider } from '../hooks/useComment';
import { CommentList } from '../components/CommentList';
import { Comment } from '../types';

const NO_COMMENTS_MESSAGE = 'No hay comentarios todavia';

describe('Comment list', () => {
  it('should render two rows in the comments list when the comments array has two entries', () => {
    const comments = [
      {
        uuid: 'c45ed5dd-ca8b-436a-8166-7874ea18800c',
        email: 'hello@world.com',
        comment: 'Hello World'
      },
      {
        uuid: 'cddb8684-c058-4d58-ac07-a2dad941ecf8',
        email: 'hola@mundo.com',
        comment: 'Hola mundo'
      }
    ] as Comment[];
    const setComments = jest.fn();
    const commentObj = {} as Comment;
    const setCommentObj = jest.fn();
    const commentToUpdateObj = {} as Comment;
    const setCommentToUpdateObj = jest.fn();
    const pushComment = jest.fn();
    const deleteComment = jest.fn();
    const updateCommentByUuid = jest.fn();
    const showEditModal = false;
    const setShowEditModal = jest.fn();
    const showConfirmModal = false;
    const setShowConfirmModal = jest.fn();

    render(
      <CommentsContext.Provider value={{
        comments,
        commentObj,
        setComments,
        pushComment,
        showEditModal,
        deleteComment,
        setCommentObj,
        setShowEditModal,
        commentToUpdateObj,
        showConfirmModal,
        setCommentToUpdateObj,
        updateCommentByUuid,
        setShowConfirmModal,
      }}>
        <CommentList />
      </CommentsContext.Provider>
    );
    waitFor(() => {
      // Ensure all the comments and emails have been rendered
      comments.forEach((comment) => {
        expect(screen.queryByText(comment.comment)).toBeNull();
        expect(screen.queryByText(comment.email)).toBeNull();
      });
    });
  });

  it('should render an empty comments message if the comments array is empty', () => {
    render(
      <CommentsContextProvider>
        <CommentList />
      </CommentsContextProvider>
    );
    waitFor(() => {
      // Ensure the no comments message exists was rendered
      expect(screen.queryByText(NO_COMMENTS_MESSAGE)).not.toBeNull();
    });
  });
});
