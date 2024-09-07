import CartModel from "../models/cart.model.js";

class CartManager {
  async createCart() {
    try {
      const newCart = new CartModel({ products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      return res.status(404).json({ msg: "No se puede crear un carrito" });
    }
  }

  async getCart() {
    try {
      const cart = await CartModel.find();
      return cart;
    } catch (error) {
      return res.status(404).json({ msg: "No se puede traer los carrito" });
    }
  }
  async getCartById(id) {
    try {
      const cart = await CartModel.findById(id);
      if (!cart) {
        return res
          .status(404)
          .json({ msg: `El carrito con id ${id} no existe` });
      }
      return cart;
    } catch (error) {
      return res.status(404).json({ msg: `El carrito con id ${id} no existe` });
    }
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      const cart = await this.getCartById(cartId);
      const existProduct = cart.products.find(
        (item) => item.product.toString() === productId
      );
      if (existProduct) {
        existProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (error) {
      return res.status(404).json({
        msg: `no se puede agregar un product al carrito con id ${id}`,
        error,
      });
    }
  }

  async deleteProductCart(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      cart.products = cart.products.filter(
        (item) => item.products.toString() !== productId
      );
      await cart.save();
      return cart;
    } catch (error) {
      return res.status(404).json({
        msg: `no se puede eliminar el carrito con id ${id}`,
        error,
      });
    }
  }

  async updateCart(cartId, updateProducts) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      cart.products = updateProducts;
      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (error) {
      return res.status(404).json({
        msg: `no se puede actualizar el carrito con id ${id}`,
        error,
      });
    }
  }

  async updateProductQuantity(cartId, productId, newQuantity) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );
      if (productIndex !== -1) {
        cart.products[productIndex].quantity = newQuantity;
        cart.markModified("products");
        await cart.save();
        return cart;
      }
    } catch (error) {
      return res.status(404).json({
        msg: "No se pudo actualizar la cantidad del producto",
        error,
      });
    }
  }

  async clearCart() {
    try {
      const cart = await CartModel.deleteMany();
      return cart;
    } catch (error) {
      console.log("No se pudo vaciar el carrito", error);
      throw error;
    }
  }
}

export default CartManager;
