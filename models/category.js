import Sequelize from "sequelize";
import sequelize from "../utils/database.js";

export const Category = sequelize.define("category", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  icon: Sequelize.STRING,
  image: Sequelize.STRING,
});
