import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const product = new ProductManager();
const router = Router();

//agregar productos
router.post("/", async (req, res) => {
  const newProduct = req.body;
  res.send(await product.addProducts(newProduct));
});
//buscar productos por id
router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  res.send(await product.getProductById(pid));
});
// traer los productos
router.get("/", async (req, res) => {
  res.send(await product.getProducts());
});
// delete productos
router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;
  res.send(await product.deleteProduct(pid));
});
//actualizar el producto
router.put("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const updatedProduct = req.body;
  res.send(await product.updateProduct(pid, updatedProduct));
});

export default router;
