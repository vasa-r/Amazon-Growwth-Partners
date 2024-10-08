import express, { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import { addAdress, getAddress } from "../controllers/addressControllers";

const addressRouter: Router = express.Router();

addressRouter.post("/", verifyToken, addAdress);
addressRouter.get("/", verifyToken, getAddress);

export default addressRouter;
