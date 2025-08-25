import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
});

export default Project;