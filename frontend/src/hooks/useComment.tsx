import { createContext, useContext, useState } from 'react';
import { Comment } from '../types';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { FormComment } from '../components/FormComment';
import { deleteComment as deleteFromAPI } from '../api/comments.requests';

type StateDispatch<T> = React.Dispatch<React.SetStateAction<T>>;

type CommentsContextType = {
  comments: Comment[];
  setComments: StateDispatch<Comment[]>;
  commentObj: Comment;
  setCommentObj: StateDispatch<Comment>;
  updateCommentObj: Comment;
  setUpdateCommentObj: StateDispatch<Comment>;
  pushComment: (comment: Comment) => void;
  deleteComment: (commentUuid: string) => void;
  updateCommentByUuid: (commentUuid: string, comment: Comment) => void;
  showEditModal: boolean;
  setShowEditModal: StateDispatch<boolean>;
  showConfirmModal: boolean;
  setShowConfirmModal: StateDispatch<boolean>;
};

export const CommentsContext = createContext<CommentsContextType>(
  {} as CommentsContextType
);

export const CommentsContextProvider = ({ children }: { children: JSX.Element }) => {
  const [commentObj, setCommentObj] = useState<Comment>({
    uuid: '',
    comment: '',
    email: '',
  });
  const [updateCommentObj, setUpdateCommentObj] = useState<Comment>({
    uuid: '',
    comment: '',
    email: '',
  });
  const [_comments, setComments] = useState<Comment[]>([]);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  // Sort comments by creation date
  const comments = _comments.sort(
    (a: Comment, b: Comment) => a.createdAt! > b.createdAt! ? 1 : -1
  );

  const pushComment = (comment: Comment) =>
    setComments([...comments, comment]);

  const deleteComment = (commentUuid: string) =>
    setComments(comments.filter((comment) => comment.uuid !== commentUuid));

  const updateCommentByUuid = (commentUuid: string, comment: Comment) =>
    setComments([
      ...comments.filter((comment) => comment.uuid !== commentUuid),
      comment,
    ]);

  const handleCloseEditModal = () => {
    setUpdateCommentObj({
      uuid: '',
      comment: '',
      email: '',
    });
    setShowEditModal(false);
  };

  const handleCloseConfirmModal = () => {
    setUpdateCommentObj({
      uuid: '',
      comment: '',
      email: '',
    });
    setShowConfirmModal(false);
  };

  const deleteCommentFromAPI = async () => {
    await deleteFromAPI({
      uuid: updateCommentObj.uuid,
    });
    deleteComment(updateCommentObj.uuid);
    setShowConfirmModal(false);
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        setComments,
        commentObj,
        setCommentObj,
        updateCommentObj,
        setUpdateCommentObj,
        pushComment,
        deleteComment,
        updateCommentByUuid,
        showEditModal,
        setShowEditModal,
        showConfirmModal,
        setShowConfirmModal,
      }}
    >
      {showEditModal && (
        <Dialog
          open={true}
          onClose={handleCloseEditModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Actualizar comentario
          </DialogTitle>
          <DialogContent>
            <FormComment shouldUpdate />
          </DialogContent>
        </Dialog>
      )}
      {showConfirmModal && (
        <Dialog
          open={true}
          onClose={handleCloseConfirmModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            ¿Seguro que desea eliminar el comentario?
          </DialogTitle>
          <DialogContent>
            <Card variant="outlined">
              <Typography variant='h6' sx={{ margin: 1 }}>
                Autor
              </Typography>
              <Typography variant='body1' sx={{ margin: 1 }}>
                {updateCommentObj.email}
              </Typography>
              <Typography variant='h6' sx={{ margin: 1 }}>
                Comentario
              </Typography>
              <Typography variant='body1' sx={{ margin: 1 }}>
                {updateCommentObj.comment}
              </Typography>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={deleteCommentFromAPI}
              variant="outlined"
            >
              Si
            </Button>
            <Button
              onClick={handleCloseConfirmModal}
              variant="contained"
              autoFocus
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentsContext = () => {
  return useContext(CommentsContext);
};
