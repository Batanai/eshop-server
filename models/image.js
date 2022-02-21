import Sequelize from "sequelize";
import sequelize from "../utils/database.js";

export const Image = sequelize.define("image", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  imageUrl: Sequelize.STRING,
});
