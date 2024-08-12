import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const router = Router();
const product = new ProductManager();

router.get("/", async (req, res) => {
  try {
    const allProducts = await product.getProducts();
    res.render("index", { products: allProducts, title: "Ecomerce-Tech" });
  } catch (error) {
    console.error("Error al obtener productos", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

// router.get("/realtimeproducts", async (req, res) => {
//   try {
//     res.render("realtimeproducts");
//   } catch (error) {
//     res.status(500).json({
//       error: "Error interno del servidor",
//     });
//   }
// });

export default router;
