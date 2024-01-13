import { Request, Response } from 'express';
import CommentModel from './comment.model';
import { Comment } from './comment.interface';
import { HTTPStatusCode } from '../utils/http.status.codes';

export const getAllComments = async (_: Request, res: Response) => {
  const comments = await CommentModel.findAll();
  const activeComments = comments.filter((comment) => !comment.deleted);
  const commentsWithoutDeletedProp = activeComments.map((comment) => {
    const { dataValues: { deleted, ...rest } } = comment;
    return rest;
  });
  res.status(HTTPStatusCode.OK).json(commentsWithoutDeletedProp);
};

export const createComment = async (req: Request, res: Response) => {
  const newComment: Comment = req.body;
  try {
    const comment = await CommentModel.create(newComment);
    res.status(HTTPStatusCode.CREATED).json(comment);
    return;
  } catch (ex) {
    console.log(ex);
  }
  res.sendStatus(HTTPStatusCode.BAD_REQUEST);
};

export const updateComment = async (req: Request, res: Response) => {
  const commentUuid = req.params.uuid;
  if (!await CommentModel.findByPk(commentUuid)) {
    res.sendStatus(HTTPStatusCode.NOT_FOUND);
    return;
  }
  const updatedComment: Comment = req.body;
  await CommentModel.update(updatedComment, { where: { uuid: commentUuid } });
  const comment = await CommentModel.findByPk(commentUuid);
  res.json(comment);
};

export const deleteComment = async (req: Request, res: Response) => {
  const commentUuid = req.params.uuid;
  const comment = await CommentModel.findByPk(commentUuid);
  if (!comment) {
    res.sendStatus(HTTPStatusCode.NOT_FOUND);
    return;
  }
  await CommentModel.update({
    ...comment,
    deleted: true
  }, {
    where: { uuid: comment.uuid }
  });
  res.sendStatus(HTTPStatusCode.NO_CONTENT);
}
