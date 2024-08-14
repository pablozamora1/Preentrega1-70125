import express, { urlencoded, json } from "express";
import productsRouter from "./src/routes/products.router.js";
import ProductManager from "./src/controllers/productManager.js";
import cartRouter from "./src/routes/cart.router.js";
import { uploader } from "./src/utils/multer.js";
import { engine } from "express-handlebars";
import viewsRouter from "./src/routes/views.router.js";
import { Server } from "socket.io";

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
const httpServer = app.listen(PUERTO, () => {
  console.log(`escuchando en el http://localhost:${PUERTO}`);
});

// Socket.io

const io = new Server(httpServer);

let messages = [];

io.on("connection", (socket) => {
  // console.log("un cliente nuevo se conecto");
  // chat
  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messagesLogs", messages);
  });
});

//productos en tiempo real

io.on("connection", async (socket) => {
  //Envia el array de products al cliente que se conectó:
  socket.emit("products", await product.getProducts());

  //Recibe el evento "eliminarProducto" desde el cliente:
  socket.on("deleteProduct", async (id) => {
    await product.deleteProduct(id);
    //Envia el array de products actualizado a todos los products:
    io.sockets.emit("products", await product.getProducts());
  });

  //Recibe el evento "agregarProducto" desde el cliente:
  socket.on("addProduct", async (products) => {
    await product.addProducts(products);
    //Envia el array de products actualizado a todos los products:
    io.sockets.emit("products", await product.getProducts());
  });
});
