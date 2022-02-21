import Sequelize from "sequelize";
import sequelize from "../utils/database.js";

export const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  passwordHash: Sequelize.STRING,
  aparment: Sequelize.STRING,
  street: Sequelize.STRING,
  city: Sequelize.STRING,
  zip: Sequelize.STRING,
  country: Sequelize.STRING,
  phone: Sequelize.STRING,
  isAdmin: Sequelize.BOOLEAN,
});
