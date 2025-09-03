import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

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
    },
    //definimos la clave foranea userId
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },

});

export default Task;