"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const types_1 = require("../types/types");
const validateNewUser = (req, res, next) => {
    var _a;
    const { userName, email, password } = req.body;
    try {
        const userSchema = zod_1.default.object({
            userName: zod_1.default.string().min(1, { message: "User name is required" }),
            email: zod_1.default.string().email({ message: "Please enter a valid email" }),
            password: zod_1.default
                .string()
                .min(6, { message: "Password must be at least 6 characters" }),
        });
        const response = userSchema.safeParse({ userName, email, password });
        if (!response.success) {
            const errorMessage = ((_a = response.error.issues[0]) === null || _a === void 0 ? void 0 : _a.message) || "Please provide valid data";
            res.status(types_1.statusCode.BAD_REQUEST).json({
                success: false,
                message: errorMessage,
            });
            return;
        }
        next();
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Server error",
        });
        return;
    }
};
exports.default = validateNewUser;
