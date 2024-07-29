import express, { urlencoded, json } from "express";
import productsRouter from "./src/routes/products.router.js";
import cartRouter from "./src/routes/cart.router.js";

const app = express();
const PUERTO = 8080;

//Middleware
app.use(urlencoded({ extended: true }));
app.use(json());

//routing
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
//Listen
app.listen(PUERTO, () => {
  console.log(`escuchando en el http://localhost:${PUERTO}`);
});
