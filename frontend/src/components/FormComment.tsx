import { Button, Grid, TextField } from '@mui/material';
import { FC, useState } from 'react';

const generateRandomEmail = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let email = '', domain = '';
  for(let i=0; i < 15; i++){
    email += chars[Math.floor(Math.random() * chars.length)];
    domain +=  chars[Math.floor(Math.random() * chars.length)];
  }
  return email + '@' + domain + '.com';
};

export const FormComment: FC = () => {
  const [comment, setComment] = useState<string | null>(null);

  const handleCommentChange =
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setComment(e.target.value);
  
  const handleCommentSubmit = async () => {
    const body = {
      email: generateRandomEmail(),
      comment,
    };

    console.log(body);
    // fetch(`${process.env.REACT_APP_API_URL}/api/comment`, {
    //   method: 'POST',
    //   body: JSON.stringify(body),
    // })
    //   .then((res) => res.json())
    //   .then((newComment) => { console.log(newComment); });
  };

  return (
    <Grid container>
      <Grid item md={4} sm={3} xs={12} />
      <Grid item md={4} sm={6} xs={12}>
        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid item xs={12}>
            <TextField
              id="email"
              disabled
              fullWidth
              label="Email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="comment"
              fullWidth
              label="Comment"
              variant="outlined"
              multiline
              value={comment}
              onChange={handleCommentChange}
            />
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
