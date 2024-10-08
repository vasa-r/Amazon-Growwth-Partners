import express, { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import { addPayment, getPayments } from "../controllers/paymentControllers";

const paymentRouter: Router = express.Router();

paymentRouter.post("/", verifyToken, addPayment);
paymentRouter.get("/", verifyToken, getPayments);

export default paymentRouter;
