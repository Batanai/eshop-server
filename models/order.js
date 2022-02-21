import Sequelize from "sequelize";
import sequelize from "../utils/database.js";

export const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  shippingAddress1: Sequelize.STRING,
  shippingAddress2: Sequelize.STRING,
  city: Sequelize.STRING,
  zip: Sequelize.STRING,
  country: Sequelize.STRING,
  phone: Sequelize.STRING,
  status: Sequelize.STRING,
  totalPrice: Sequelize.DOUBLE,
  dateOrdered: Sequelize.DATE,
});
