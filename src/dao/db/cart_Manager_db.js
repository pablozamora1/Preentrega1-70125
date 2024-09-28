import CartModel from "../models/cart.model.js";
class CartManager {
  async createCart() {
    try {
      // { products: [] }
      const newCart = new CartModel();
      await newCart.save();
      return newCart;
    } catch (error) {
      return console.log("No se puede crear un carrito", error);
    }
  }

  async getCart() {
    try {
      const cart = await CartModel.find();
      return cart;
    } catch (error) {
      return console.log("No se puede traer los carrito", error);
    }
  }
  async getCartById(cartId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        return console.log(`El carrito con _id ${cartId} no existe`, error);
      }
      return cart;
    } catch (error) {
      throw (error, console.log(`El carrito con _id ${cartId} no existe`));
    }
  }

  async addProductToCart(idCart, idProduct, quantity = 1) {
    try {
      const cart = await this.getCartById(idCart);
      // const existProduct = cart.products.find(
      //   (item) => item.products.toString() === idProduct
      // );

      const existProduct = cart.products.find(
        (i) => i.products.toString()
      )


      console.log(cart);
      if (existProduct) {
        existProduct.quantity += quantity;
      } else {
        cart.products.push({ products: idProduct, quantity });
      }
      cart.markModified("products");
      // await cart.save();
      return cart;
    } catch (error) {
      return console.log(
        `no se puede agregar un product al carrito con id ${idCart}`,
        error
      );
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
      console.log(`no se puede eliminar el carrito con id ${id}`);
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
      return console.log(`no se puede actualizar el carrito con id ${id}`);
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
      console.log("No se pudo actualizar la cantidad del producto");
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
