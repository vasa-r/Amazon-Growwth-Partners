"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const addressControllers_1 = require("../controllers/addressControllers");
const addressRouter = express_1.default.Router();
addressRouter.post("/", verifyToken_1.default, addressControllers_1.addAdress);
addressRouter.get("/", verifyToken_1.default, addressControllers_1.getAddress);
exports.default = addressRouter;
