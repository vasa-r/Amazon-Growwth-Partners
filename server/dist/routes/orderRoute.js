"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const orderControllers_1 = require("../controllers/orderControllers");
const orderRouter = express_1.default.Router();
orderRouter.post("/", verifyToken_1.default, orderControllers_1.addOrder);
orderRouter.get("/", verifyToken_1.default, orderControllers_1.getOrder);
exports.default = orderRouter;
