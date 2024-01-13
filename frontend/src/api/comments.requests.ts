import axios from 'axios';

type PostCommentParams = { body: Record<string, unknown> };
type UpdateCommentParams = PostCommentParams & { uuid: string; };

export const getAllComments = () => axios.get(
  `${process.env.REACT_APP_API_URL}/api/comments/`,
);

export const postComment = ({ body }: PostCommentParams) => axios.post(
  `${process.env.REACT_APP_API_URL}/api/comment/`,
  body,
);

export const updateComment = ({ body, uuid }: UpdateCommentParams) => axios.put(
  `${process.env.REACT_APP_API_URL}/api/comment/${uuid}/`,
  body,
);

export const deleteComment = ({ uuid }: UpdateCommentParams) => axios.delete(
  `${process.env.REACT_APP_API_URL}/api/comment/${uuid}/`,
);
