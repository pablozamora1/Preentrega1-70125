import { Router } from "express";
import cartManager from "../controllers/cartManager.js";

const router = Router();
const cart = new cartManager();

//agregar carrito
router.post("/", async (req, res) => {
  try {
    res.send(await cart.addCart());
  } catch (error) {
    res.send("Error al Agregar el Carrito", error);
  }
});
//leer carrito
router.get("/", async (req, res) => {
  try {
    res.send(await cart.readCart());
  } catch (error) {
    res.send("Error al Leer el Carrito", error);
  }
});

//buscar carrito por id
router.get("/:cId", async (req, res) => {
  try {
    const cId = req.params.cId;
    res.send(await cart.getCartById(cId));
  } catch (error) {
    res.send("Error al Buscar los Carritos por ID", error);
  }
});
// agregar productos al carrito
router.post("/:cId/products/:pId", async (req, res) => {
  try {
    const idCart = req.params.cId;
    const idProduct = req.params.pId;
    res.send(await cart.addToCart(idCart, idProduct));
  } catch (error) {
    res.send("Error al Agregar productos al Carrito", error);
  }
});

export default router;
