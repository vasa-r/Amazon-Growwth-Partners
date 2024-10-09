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
exports.getPayments = exports.addPayment = void 0;
const paymentModel_1 = __importDefault(require("../model/paymentModel"));
const types_1 = require("../types/types");
const addPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { name, paymentType, cardNumber, cvv, upiId } = req.body;
    try {
        const createPayment = yield paymentModel_1.default.create({
            user,
            name,
            paymentType,
            cardNumber,
            cvv,
            upiId,
        });
        if (!createPayment) {
            res.status(types_1.statusCode.BAD_REQUEST).json({
                success: false,
                message: "Payment method not added. Please try agin later",
            });
            return;
        }
        res.status(types_1.statusCode.CREATED).json({
            success: true,
            message: "Payment method added",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.addPayment = addPayment;
const getPayments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payment = yield paymentModel_1.default.find({
            user: req.user,
        }, { paymentType: 1, cardNumber: 1, upiId: 1 });
        if (!payment) {
            res.status(types_1.statusCode.BAD_REQUEST).json({
                success: false,
                message: "No payment option avilable. Please add one",
            });
            return;
        }
        res.status(types_1.statusCode.CREATED).json({
            success: true,
            message: "Payment method fetched",
            data: payment,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getPayments = getPayments;
