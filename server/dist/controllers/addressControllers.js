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
exports.getAddress = exports.addAdress = void 0;
const addressModel_1 = __importDefault(require("../model/addressModel"));
const types_1 = require("../types/types");
const addAdress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { addressTitle, buildNo, address, city, pincode, phone } = req.body;
    try {
        const createAddress = yield addressModel_1.default.create({
            addressTitle,
            buildNo,
            address,
            city,
            pincode,
            phone,
            user,
        });
        if (!createAddress) {
            res.status(types_1.statusCode.BAD_REQUEST).json({
                success: false,
                message: "Address not added. Please try agin later",
            });
            return;
        }
        res.status(types_1.statusCode.CREATED).json({
            success: true,
            message: "Address added",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.addAdress = addAdress;
const getAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield addressModel_1.default.find({
            user: req.user,
        });
        if (!address) {
            res.status(types_1.statusCode.BAD_REQUEST).json({
                success: false,
                message: "No addres avilable. Please add one",
            });
            return;
        }
        res.status(types_1.statusCode.CREATED).json({
            success: true,
            message: "Address fetched",
            data: address,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.getAddress = getAddress;
