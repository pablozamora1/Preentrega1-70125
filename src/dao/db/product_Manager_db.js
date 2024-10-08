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
      const products = await ProductModel.find().lean();
      return products;
    } catch (error) {
      console.log("Error al obtener los productos", error);
    }
  }
  // FUNCION PARA OBTENER LOS PRODUCTOS EN PAGINAS
  async getProductsPag(
    page = 1,
    limit = 5,
    query = {},
    title = "",
    order = "asc"
  ) {
    const searchQuery = { $or: [{ title: { $regex: title, $options: "i" } }] };
    const filter = { ...searchQuery, ...query };
    const sortPrice = order == "asc" ? 1 : -1;

    const productsPag = await ProductModel.paginate(filter, {
      page,
      limit,
      sort: { price: sortPrice },
      lean: true,
    });

    return productsPag;
  }

  // FUNCION PARA BUSCAR UN PRODUCTO POR ID
  async getProductById(_id) {
    try {
      const product = await ProductModel.findById(_id);

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
  async updateProduct(_id, productUpdated) {
    try {
      const updated = await ProductModel.findByIdAndUpdate(_id, productUpdated);

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
  async deleteProduct(_id) {
    try {
      const deleted = await ProductModel.findByIdAndDelete(_id);
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
