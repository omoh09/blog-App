import { DataTypes, Model } from 'sequelize';
import sequelize from '../../util/database';

interface IUser extends Model {
  email: string;
  password: string;
}

const User = sequelize.define<IUser>('User', {
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

export default User;
