import mongoose, { Schema, Document } from "mongoose";

interface PaymentDocument extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  paymentType: string;
  cardNumber?: string;
  cvv?: string;
  upiId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema = new Schema<PaymentDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["UPI", "Debit Card", "Credit Card"],
      required: true,
    },
    cardNumber: {
      type: String,
      required: function (this: PaymentDocument) {
        return (
          this.paymentType === "Debit Card" ||
          this.paymentType === "Credit Card"
        );
      },
    },
    cvv: {
      type: String,
      required: function (this: PaymentDocument) {
        return (
          this.paymentType === "Debit Card" ||
          this.paymentType === "Credit Card"
        );
      },
    },
    upiId: {
      type: String,
      required: function (this: PaymentDocument) {
        return this.paymentType === "UPI";
      },
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model<PaymentDocument>("Payment", PaymentSchema);

export default Payment;
