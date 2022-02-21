import express from "express";
import cors from "cors";
import morgan from "morgan";
import sequelize from "./utils/database.js";
import dotenv from "dotenv";
import { User } from "./models/user.js";
import { Product } from "./models/product.js";
import { Category } from "./models/category.js";
import { CartItem } from "./models/cartItem.js";
import { Cart } from "./models/cart.js";
import { Order } from "./models/order.js";
import { Image } from "./models/image.js";

import routes from "./routes/routes.js";
import { authJwt } from "./helpers/jwt.js";
import { errorHandler } from "./helpers/error-handler.js";

const app = express();
dotenv.config();
const api = process.env.API_URL;

//middleware
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);

app.use(`${api}`, routes);

//associations
Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Image);
Image.belongsTo(Product);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

CartItem.hasMany(Cart);
Cart.belongsTo(CartItem);

User.hasMany(Cart);
Cart.belongsTo(User);

Cart.hasOne(Order);
Order.belongsTo(Cart);

//sync database and start server
sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`server has started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
