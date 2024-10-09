"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const paymentControllers_1 = require("../controllers/paymentControllers");
const paymentRouter = express_1.default.Router();
paymentRouter.post("/", verifyToken_1.default, paymentControllers_1.addPayment);
paymentRouter.get("/", verifyToken_1.default, paymentControllers_1.getPayments);
exports.default = paymentRouter;
