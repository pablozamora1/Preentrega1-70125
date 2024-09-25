import { Router } from "express";
import ProductManager from "../dao/db/product_Manager_db.js";

const product = new ProductManager();
const router = Router();

//agregar productos
router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    res.send(await product.addProduct(newProduct));
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto" });
  }
});

//buscar productos por id
router.get("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    res.send(await product.getProductById(pid));
  } catch (error) {
    res.status(500).json({ error: "Error al buscar el producto" });
  }
});

// traer los productos
router.get("/", async (req, res) => {
  try {
    const products = await product.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al traer los productos" });
  }
});

router.get(
  "/products/paginated",
  async (req, res, next) => {
    try {
      const { page = 1, limit = 8, query = {}, sort, title = "" } = req.query;
      const queryObject =
        typeof query === "string" && query !== "" ? JSON.parse(query) : {};

      

      const productP = await product.getProductsPag(
        page,
        limit,
        queryObject,
        title,
        sort
      );

      res.send({
        products: productP.docs,
        pagination: {
          totalPages: productP.totalPages,
          page: Number(productP.page),
          hasPrevPage: productP.hasPrevPage,
          hasNextPage: productP.hasNextPage,
          prevPage: productP.prevPage,
          nextPage: productP.nextPage,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

// delete productos
router.delete("/:pid", async (req, res) => {
  try {
    const pid = req.params._id;
    res.send(await product.deleteProduct(pid));
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

//actualizar el producto
router.put("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const updatedProduct = req.body;
    res.send(await product.updateProduct(pid, updatedProduct));
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

export default router;
