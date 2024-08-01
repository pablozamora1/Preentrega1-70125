import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const product = new ProductManager();
const router = Router();

//agregar productos
router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    res.send(await product.addProducts(newProduct));
  } catch (error) {
    res.send("Error al agregar el producto", error);
  }
});
//buscar productos por id
router.get("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    res.send(await product.getProductById(pid));
  } catch (error) {
    res.send("Error al buscar el producto", error);
  }
});
// traer los productos
router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await product.getProducts();
    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.send("Error al traer los productos", error);
  }
});

// delete productos
router.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    res.send(await product.deleteProduct(pid));
  } catch (error) {
    res.send("Error al eliminar el producto", error);
  }
});
//actualizar el producto
router.put("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const updatedProduct = req.body;
    res.send(await product.updateProduct(pid, updatedProduct));
  } catch (error) {
    res.send("Error al actualizar el producto", error);
  }
});

export default router;
