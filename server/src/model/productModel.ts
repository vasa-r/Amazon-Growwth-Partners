import mongoose from "mongoose";

interface IProduct extends Document {
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  shippingInformation: string;
  image: string;
}

const Schema = mongoose.Schema;

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  shippingInformation: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
