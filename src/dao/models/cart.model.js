import { Schema, model } from "mongoose";
const nameCoollection = "carts";
const cartSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const CartModel = model(nameCoollection, cartSchema);

export default CartModel;
