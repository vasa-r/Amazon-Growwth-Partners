import mongoose, { Document, Schema, Types } from "mongoose";

interface IAddress extends Document {
  addressTitle: string;
  buildNo: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  user: Types.ObjectId;
}

const addressSchema = new Schema<IAddress>(
  {
    addressTitle: {
      type: String,
      required: [true, "Address title is required"],
      trim: true,
    },
    buildNo: {
      type: String,
      required: [true, "Building number is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      match: [/^\d{6}$/, "Please enter a valid pincode"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Address = mongoose.model<IAddress>("Address", addressSchema);

export default Address;
