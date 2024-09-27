import mongoose, { Schema, model } from "mongoose";

const nameCoollection = "carts";
const cartSchema = Schema({
  products: [
    {
      products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        require: true,
      },
      _id: false,
    },
  ],
});

const CartModel = model(nameCoollection, cartSchema);

export default CartModel;
