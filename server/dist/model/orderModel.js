"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
const getRandomDeliveryDate = (daysFromToday) => {
    const today = new Date();
    const randomDays = Math.floor(Math.random() * daysFromToday) + 1; // Random number of days (1 to daysFromToday)
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + randomDays);
    return deliveryDate;
};
const orderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },
    products: [
        {
            _id: false,
            id: {
                type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
