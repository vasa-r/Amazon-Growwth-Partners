import express, { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import { getAllProducts, getProduct } from "../controllers/productControllers";

const productRouter: Router = express.Router();

productRouter.get("/", verifyToken, getAllProducts);
productRouter.get("/:id", verifyToken, getProduct);

export default productRouter;
