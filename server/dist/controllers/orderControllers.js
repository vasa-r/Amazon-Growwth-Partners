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
exports.getOrder = exports.addOrder = void 0;
const orderModel_1 = __importDefault(require("../model/orderModel"));
const types_1 = require("../types/types");
const addOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { address, products, totalPrice, paymentMode, deliveryDate, orderedDate, } = req.body;
    try {
        const createOrder = yield orderModel_1.default.create({
            user,
            address,
            products,
            totalPrice,
            paymentMode,
            deliveryDate,
            orderedDate,
        });
        if (!createOrder) {
            res.status(types_1.statusCode.BAD_REQUEST).json({
                success: false,
                message: "Couldn't place order now. Please try again later",
            });
            return;
        }
        res.status(types_1.statusCode.CREATED).json({
            success: true,
            message: "Order placed successfully",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.addOrder = addOrder;
const getOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel_1.default.find({
            user: req.user,
        });
        if (!orders) {
            res.status(types_1.statusCode.BAD_REQUEST).json({
                success: false,
                message: "No orders avilable. Please add one",
            });
            return;
        }
        res.status(types_1.statusCode.CREATED).json({
            success: true,
            message: "Orders fetched",
            data: orders,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getOrder = getOrder;
