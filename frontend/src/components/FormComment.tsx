import { Alert, Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { FC, useState } from 'react';
import { Comment } from '../types';
import { useCommentsContext } from '../hooks/useComment';

const generateRandomEmail = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  const emailDomains = ['gmail.com', 'outlook.com', 'outlook.es', 'yahoo.com', 'live.com'];
  let email = '';
  for(let i=0; i < 15; i++){
    email += chars[Math.floor(Math.random() * chars.length)];
  }
  return email + '@' + emailDomains[Math.floor(Math.random() * emailDomains.length)];
};

export const FormComment: FC = () => {
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState('');
  const { pushComment } = useCommentsContext();

  const handleCommentChange =
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setComment(e.target.value);
  
  const handleCommentSubmit = async () => {
    setError('');
    if (comment.length <= 0) {
      setError('El campo no puede quedar vacío');
      return;
    }
    const body = {
      email: generateRandomEmail(),
      comment,
    };

    const { data }: { data: Comment } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/comment`,
      body
    );
    if (data) pushComment(data);
  };

  return (
    <Grid container>
      <Grid item md={4} sm={3} xs={12} />
      <Grid item md={4} sm={6} xs={12}>
        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="Email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Comment"
              variant="outlined"
              multiline
              maxRows={4}
              value={comment}
              onChange={handleCommentChange}
            />
            {error &&
              <Alert severity="error">
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
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
