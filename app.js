import express, { urlencoded, json } from "express";
import productsRouter from "./src/routes/products.router.js";
import cartRouter from "./src/routes/cart.router.js";
import { uploader } from "./src/utils/multer.js";
import { engine } from "express-handlebars";
import viewsRouter from "./src/routes/views.router.js";
import { Server, Socket } from "socket.io";

const app = express();
const PUERTO = 8080;

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
//Listen
const httpServer = app.listen(PUERTO, () => {
  console.log(`escuchando en el http://localhost:${PUERTO}`);
});

// Socket.io

const io = new Server(httpServer);

let messages = [];

io.on("connection", (socket) => {
  // console.log("un cliente nuevo se conecto");

  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messagesLogs", messages);
  });
});
