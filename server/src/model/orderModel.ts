import mongoose, { Schema, Document } from "mongoose";
import { string } from "zod";

export interface OrderType extends Document {
  user: mongoose.Types.ObjectId;
  address: mongoose.Types.ObjectId;
  products: Array<{
    id: mongoose.Types.ObjectId;
    image: string;
    price: string;
    quantity: string;
    title: string;
  }>;
  totalPrice: number;
  paymentMode: string;
  deliveryDate: String;
  orderedDate: String;
}

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const getRandomDeliveryDate = (daysFromToday: number): Date => {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * daysFromToday) + 1; // Random number of days (1 to daysFromToday)
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + randomDays);
  return deliveryDate;
};

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
        _id: false,
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
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
      default: () => getRandomDeliveryDate(15),
      required: true,
    },
    orderedDate: {
      type: String,
      default: formatDate(new Date()),
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<OrderType>("Order", orderSchema);
export default Order;
