import { Button, Card, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { Comment as CommentType } from '../types';
import { useCommentsContext } from '../hooks/useComment';

export const Comment: FC<CommentType> = ({ uuid, email, comment }) => {
  const {
    comments,
    setUpdateCommentObj,
    setShowEditModal,
    setShowConfirmModal,
  } = useCommentsContext();

  const deleteComment = () => {
    const comment = comments.find((comment) => comment.uuid === uuid);
    if (comment) {
      setUpdateCommentObj({
        uuid: comment.uuid,
        comment: comment.comment,
        email: comment.email,
      });
      setShowConfirmModal(true);
    }
  };

  const updateComment = () => {
    const comment = comments.find((comment) => comment.uuid === uuid);
    if (comment) {
      setUpdateCommentObj({
        uuid: comment.uuid,
        comment: comment.comment,
        email: comment.email,
      });
      setShowEditModal(true);
    }
  };

  return (
    <Grid container spacing={2} sx={{ mt: 5 }}>
      <Grid item xs={12} sm={3} md={4} />
      <Grid item xs={12} sm={6} md={4}>
        <Card variant="outlined">
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
                Delete
              </Button>
              <Button
                variant="contained"
                sx={{ margin: 2 }}
                onClick={updateComment}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};
