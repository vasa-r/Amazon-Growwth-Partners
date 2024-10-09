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
exports.loginUser = exports.createUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../model/userModel"));
const types_1 = require("../types/types");
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
// new user controller for SIGNUP
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    try {
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            res.status(types_1.statusCode.CONFLICT).json({
                success: false,
                message: "Email already exists. Please login",
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield userModel_1.default.create({
            userName,
            email,
            password: hashedPassword,
        });
        if (!newUser) {
            res.status(types_1.statusCode.BAD_REQUEST).json({
                success: false,
                message: "Registration failed. Please try again later",
            });
            return;
        }
        res.status(types_1.statusCode.CREATED).json({
            success: true,
            message: "Signup successful",
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.createUser = createUser;
// existing user controller for Login
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "User not found please signin",
            });
            return;
        }
        const verifyPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!verifyPassword) {
            res.status(types_1.statusCode.UNAUTHORIZED).json({
                success: false,
                message: "Incorrect password. Please enter correct password",
            });
            return;
        }
        if (!secret) {
            res.status(types_1.statusCode.UNAVAILABLE).json({
                success: false,
                message: "Secret code is not provided",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, secret);
        res.status(types_1.statusCode.ACCEPTED).json({
            success: true,
            message: "Login Successful",
            token: token,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.loginUser = loginUser;
