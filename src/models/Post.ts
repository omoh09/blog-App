import { DataTypes, Model } from 'sequelize';
import sequelize from '../../util/database';

interface IPost extends Model {
  id: number;
  title: string;
  content: string;
}

const Post = sequelize.define<IPost>('posts', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Post;
