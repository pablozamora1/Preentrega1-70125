import ProductModel from "../models/product.model.js";

class ProductManager {
  async addProduct({
    title,
    description,
    price,
    thumbnails: thumbnails,
    code,
    stock,
    category,
  }) {
    try {
      if (!title || !description || !price || !code || !stock || !category) {
        console.log(
          `El Codigo ${code} esta Repetido, por favor cambia el codigo del producto y vuelve a intentarlo `
        );
        return;
      }

      const existProduct = await ProductModel.findOne({ code: code });

      if (existProduct) {
        console.log("El código debe ser único");
        return;
      }

      const newProduct = new ProductModel({
        title,
        description,
        price,
        thumbnails: thumbnails || [],
        code,
        stock,
        category,
        status: true,
      });

      await newProduct.save();
    } catch (error) {
      console.log("Error al agregar producto", error);
      throw error;
    }
  }

  // FUNCION PARA OBTENER LOS PRODUCTOS
  async getProducts() {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      console.log("Error al obtener los productos", error);
    }
  }
  // FUNCION PARA BUSCAR UN PRODUCTO POR ID
  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id);

      if (!product) {
        console.log("Producto no encontrado");
        return null;
      }

      console.log("Producto encontrado!");
      return product;
    } catch (error) {
      console.log("Error al traer un producto por id");
    }
  }

  // FUNCION PARA ACTUALIZAR UN PRODUCTO
  async updateProduct(id, productUpdated) {
    try {
      const updated = await ProductModel.findByIdAndUpdate(id, productUpdated);

      if (!updated) {
        console.log("No se encuentra el producto");
        return null;
      }

      console.log("Producto actualizado!");
      return updated;
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }

  // FUNCION PARA ELIMINAR UN PRODUCTO
  async deleteProduct(id) {
    try {
      const deleted = await ProductModel.findByIdAndDelete(id);

      if (!deleted) {
        console.log(
          "No se encuentra el producto a eliminar, intente nuevamente"
        );
        return null;
      }

      console.log("Producto eliminado correctamente!");
    } catch (error) {
      console.log("Error al eliminar el producto", error);
      throw error;
    }
  }
}
export default ProductManager;
