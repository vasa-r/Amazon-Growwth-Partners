import mongoose, { Schema, Document } from "mongoose";

export interface OrderType extends Document {
  user: mongoose.Types.ObjectId;
  address: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
  totalPrice: number;
  paymentMode: string;
  deliveryDate: Date;
  orderedDate: Date;
}

const orderSchema: Schema = new Schema<OrderType>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ["Credit Card", "Debit Card", "UPI", "COD"],
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    orderedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<OrderType>("Order", orderSchema);
export default Order;
