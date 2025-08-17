import { DataTypes } from 'sequelize';
import sequelize from './src/config/database.js';

  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }

});

export default Task;