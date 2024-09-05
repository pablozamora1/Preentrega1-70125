import express, { urlencoded, json } from "express";
import productsRouter from "./src/routes/products.router.js";
import cartRouter from "./src/routes/cart.router.js";
import ProductManager from "./src/dao/db/product_Manager_db.js";
import { uploader } from "./src/utils/multer.js";
import { engine } from "express-handlebars";
import viewsRouter from "./src/routes/views.router.js";
// import { Server } from "socket.io";
import "./src/database.js";



const app = express();
const PUERTO = 8080;
const product = new ProductManager();

//Middleware
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(express.static("./public"));
// handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use("/", viewsRouter);

//routing

app.post("/", uploader.single("myFile"), (req, res) => {
  res.send("archivo subido");
});

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/realtimeproducts", viewsRouter);

//Listen
app.listen(PUERTO, () => {
  console.log(`escuchando en el http://localhost:${PUERTO}`);
});
