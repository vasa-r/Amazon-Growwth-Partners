"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const productControllers_1 = require("../controllers/productControllers");
const productRouter = express_1.default.Router();
productRouter.get("/", verifyToken_1.default, productControllers_1.getAllProducts);
productRouter.get("/:id", verifyToken_1.default, productControllers_1.getProduct);
exports.default = productRouter;
