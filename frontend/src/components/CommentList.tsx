import { FC } from 'react';
import { Comment } from './Comment';
import { useCommentsContext } from '../hooks/useComment';
import { Grid, Typography } from '@mui/material';

export const CommentList: FC = () => {
  const { comments } = useCommentsContext();

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} sm={3} md={4} />
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant='h5'>Comentarios:</Typography>
      </Grid>
      <Grid item xs={12} sm={3} md={4} />
      <Grid item xs={12} sm={3} md={4} />
      <Grid item xs={12} sm={6} md={4}>
        {
          comments.length
            ? comments.map((comment) => (
              <Comment
                key={comment.uuid}
                uuid={comment.uuid}
                email={comment.email}
                comment={comment.comment}
              />
            ))
            : <>No hay comentarios todavia</>
        }
      </Grid>
    </Grid>
  );
};
