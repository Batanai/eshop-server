import express from "express";
import productsRoutes from "./productsRoutes.js";
import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";

const app = express();

app.use("/products", productsRoutes);
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);

export default app;
