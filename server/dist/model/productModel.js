"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const productSchema = new Schema({
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
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
