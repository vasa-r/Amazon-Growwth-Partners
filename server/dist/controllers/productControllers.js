"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getAllProducts = void 0;
const productModel_1 = __importDefault(require("../model/productModel"));
const types_1 = require("../types/types");
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.find();
        if (products.length < 1) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "No products available",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Data fetched Successfully",
            data: products,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getAllProducts = getAllProducts;
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield productModel_1.default.findById(id);
        if (!product) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "No product available",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Data fetched Successfully",
            data: product,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getProduct = getProduct;
