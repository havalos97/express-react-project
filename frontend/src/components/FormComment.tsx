import { Alert, Button, Grid, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { Comment } from '../types';
import { useCommentsContext } from '../hooks/useComment';
import { postComment, updateComment } from '../api/comments.requests';

const generateRandomEmail = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  const emailDomains = ['gmail.com', 'outlook.com', 'outlook.es', 'yahoo.com', 'live.com'];
  let email = '';
  for(let i=0; i < 15; i++){
    email += chars[Math.floor(Math.random() * chars.length)];
  }
  return email + '@' + emailDomains[Math.floor(Math.random() * emailDomains.length)];
};

type FormCommentProps = {
  shouldUpdate?: boolean;
}

export const FormComment: FC<FormCommentProps> = ({
  shouldUpdate = false
}) => {
  const {
    commentObj,
    setCommentObj,
    commentToUpdateObj,
    setCommentToUpdateObj,
    updateCommentByUuid,
    setShowEditModal,
  } = useCommentsContext();
  const [error, setError] = useState('');
  const { pushComment } = useCommentsContext();

  const handleCommentChange =
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      shouldUpdate
        ? setCommentToUpdateObj({
          ...commentToUpdateObj,
          comment: e.target.value,
        })
        : setCommentObj({
          ...commentObj,
          comment: e.target.value,
        });
  
  const handleCommentSubmit = async () => {
    // Resets error state
    setError('');
    if (
      shouldUpdate
        ? commentToUpdateObj.comment.length <= 0
        : commentObj.comment.length <= 0
    ) {
      setError('El campo no puede quedar vacío');
      return;
    }

    if (shouldUpdate) {
      const { data }: { data: Comment } = await updateComment({
        uuid: commentToUpdateObj.uuid,
        body: commentToUpdateObj,
      });
      updateCommentByUuid(commentToUpdateObj.uuid, data);
      setShowEditModal(false);
    } else {
      const { data }: { data: Comment } = await postComment({
        body: {
          email: generateRandomEmail(),
          comment: commentObj.comment,
        }
      });
      if (data) pushComment(data);
      setCommentObj({
        uuid: '',
        comment: '',
        email: '',
      });
    }
  };

  return (
    <Grid container>
      <Grid item md={shouldUpdate ? 12 : 4} sm={3} xs={12} />
      <Grid item md={shouldUpdate ? 12 : 4} sm={6} xs={12}>
        <Grid container spacing={2} sx={{ mt: shouldUpdate ? 0 : 5 }}>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="Email"
              variant="outlined"
              value={
                shouldUpdate
                  ? commentToUpdateObj.email
                  : ''
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Comment"
              variant="outlined"
              multiline
              maxRows={4}
              value={
                shouldUpdate
                  ? commentToUpdateObj.comment
                  : commentObj.comment
              }
              onChange={handleCommentChange}
            />
            {!!error &&
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            }
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleCommentSubmit}
            >
              {shouldUpdate ? 'Update comment' : 'Save'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
