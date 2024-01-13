import { Button, Card, Grid, Typography } from '@mui/material';
import { FC, useMemo } from 'react';
import { Comment as CommentType } from '../types';
import { useCommentsContext } from '../hooks/useComment';

export const Comment: FC<CommentType> = ({ uuid, email, comment }) => {
  const {
    comments,
    setUpdateCommentObj,
    setShowEditModal,
    setShowConfirmModal,
  } = useCommentsContext();

  const selectedComment = useMemo(
    () => comments.find((comment) => comment.uuid === uuid) as CommentType,
    [uuid]
  );

  const deleteComment = () => {
    if (selectedComment) {
      setUpdateCommentObj({
        uuid: selectedComment.uuid,
        comment: selectedComment.comment,
        email: selectedComment.email,
      });
      setShowConfirmModal(true);
    }
  };

  const updateComment = () => {
    if (selectedComment) {
      setUpdateCommentObj({
        uuid: selectedComment.uuid,
        comment: selectedComment.comment,
        email: selectedComment.email,
      });
      setShowEditModal(true);
    }
  };

  return (
    <Card variant="outlined" sx={{ mt: 2, mb: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography mt={2} variant='h5' sx={{ margin: 2 }}>
            {email}
          </Typography>
          <Typography mt={2} variant='h6' sx={{ margin: 2 }}>
            {comment}
          </Typography>
          <Button
            variant="outlined"
            sx={{ margin: 2 }}
            onClick={deleteComment}
          >
            Eliminar
          </Button>
          <Button
            variant="contained"
            sx={{ margin: 2 }}
            onClick={updateComment}
          >
            Actualizar
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};
