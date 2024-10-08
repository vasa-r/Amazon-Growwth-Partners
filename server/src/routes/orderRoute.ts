import express, { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import { addOrder, getOrder } from "../controllers/orderControllers";

const orderRouter: Router = express.Router();

orderRouter.post("/", verifyToken, addOrder);
orderRouter.get("/", verifyToken, getOrder);

export default orderRouter;
