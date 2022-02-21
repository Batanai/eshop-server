import Sequelize from "sequelize";

const sequelize = new Sequelize("eshop", "postgres", "2012", {
  dialect: "postgres",
  host: "localhost",
});

export default sequelize;
