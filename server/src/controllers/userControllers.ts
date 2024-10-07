import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/userModel";
import { LoginTypes, SignUpTypes, statusCode } from "../types/types";

const secret = process.env.JWT_SECRET;

// new user controller for SIGNUP
const createUser = async (
  req: Request<{}, {}, SignUpTypes>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(statusCode.CONFLICT).json({
        success: false,
        message: "Email already exists. Please login",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: "Registration failed. Please try again later",
      });
      return;
    }

    res.status(statusCode.CREATED).json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// existing user controller for Login
const loginUser = async (
  req: Request<{}, {}, LoginTypes>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "User not found please signin",
      });
      return;
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      res.status(statusCode.UNAUTHORIZED).json({
        success: false,
        message: "Incorrect password. Please enter correct password",
      });
      return;
    }

    if (!secret) {
      res.status(statusCode.UNAVAILABLE).json({
        success: false,
        message: "Secret code is not provided",
      });
      return;
    }

    const token = jwt.sign({ userId: user._id }, secret);

    res.status(statusCode.ACCEPTED).json({
      success: true,
      message: "Login Successful",
      token: token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { createUser, loginUser };
