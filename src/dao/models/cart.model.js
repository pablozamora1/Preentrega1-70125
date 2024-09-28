import mongoose, { Schema, model } from "mongoose";

const nameCoollection = "carts";
const cartSchema = Schema({
  products: [
    {
      products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
        require: true,
      },
      _id: false,
    },
  ],
});

// Middleware pre-hook para realizar el populate automáticamente
cartSchema.pre("find", function () {
  this.populate("products.products");
});

cartSchema.pre("findOne", function () {
  this.populate("products.products");
});

cartSchema.set("toJSON", {
  tranform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

const CartModel = model(nameCoollection, cartSchema);

export default CartModel;
