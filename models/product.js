import Sequelize from "sequelize";
import sequelize from "../utils/database.js";

export const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  richDescription: Sequelize.STRING,
  price: Sequelize.DOUBLE,
  image: Sequelize.STRING,
  brand: Sequelize.STRING,
  countInStock: Sequelize.INTEGER,
  rating: Sequelize.DOUBLE,
  isFeatured: Sequelize.BOOLEAN,
  numberOfRatings: Sequelize.INTEGER,
});
