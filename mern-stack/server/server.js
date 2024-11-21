import express from "express";
import dotenv from "dotenv";
import { mongoDBConnect } from "./config/db.js";
import productsRouter from './router/product.route.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/products', productsRouter)

app.listen(5000, () => {
  mongoDBConnect();
  console.log("listening on port http://localhost:5000");
});
