import express, { Router } from "express";
import { createUser, loginUser } from "../controllers/userControllers";
import validateNewUser from "../middleware/validateNewUser";
import validateExistingUser from "../middleware/validateExistingUser";

const userRouter: Router = express.Router();

userRouter.post("/signup", validateNewUser, createUser);
userRouter.post("/login", validateExistingUser, loginUser);

export default userRouter;
