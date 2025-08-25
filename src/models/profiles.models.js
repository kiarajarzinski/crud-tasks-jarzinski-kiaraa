import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Profile = sequelize.define('Profile', {
  bio: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
});

export default Profile;