import { Router } from "express";
import ProductManager from "../dao/db/product_Manager_db.js";

const router = Router();
const product = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const result = await product.getProductsPag(page, limit);

    res.render("index", {
      products: result.docs,
      totalPages: result.totalPages,
      page: Number(result.page),
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realtimeproducts");
  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

export default router;
