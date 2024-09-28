import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const nameCoollection = "product";
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  thumbnails: {
    type: [String],
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

productSchema.plugin(mongoosePaginate);

const ProductModel = model(nameCoollection, productSchema);

export default ProductModel;
