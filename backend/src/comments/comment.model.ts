import { Model, DataTypes } from 'sequelize';
import { Comment } from './comment.interface';
import sequelize from '../sequelize';

class CommentModel extends Model<Comment> implements Comment {
  public uuid: string;
  public email: string;
  public comment: string;
  public deleted?: boolean;
}

CommentModel.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'comments',
    sequelize,
  }
);

export default CommentModel;
