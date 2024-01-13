require('dotenv').config(); 
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { healthcheck } from './main/main.controller';
import { createComment, deleteComment, getAllComments, updateComment } from './comments/comment.controller';

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(bodyParser.json());
app.use(cors({
  origin: '*',
}));

app.get('/api/healthcheck', healthcheck);

app.get('/api/comments', getAllComments);
app.post('/api/comment', createComment);
app.put('/api/comment/:uuid', updateComment);
app.delete('/api/comment/:uuid', deleteComment);

app.listen(port, () => {
  console.log(`Server running at http://${process.env.APP_HOST}:${port}`);
});
