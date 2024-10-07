import z from "zod";
import { NextFunction, Request, Response } from "express";
import { statusCode } from "../types/types";

const validateNewUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { userName, email, password } = req.body;

  try {
    const userSchema = z.object({
      userName: z.string().min(1, { message: "User name is required" }),
      email: z.string().email({ message: "Please enter a valid email" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
    });

    const response = userSchema.safeParse({ userName, email, password });

    if (!response.success) {
      const errorMessage =
        response.error.issues[0]?.message || "Please provide valid data";
      res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: errorMessage,
      });
      return;
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Server error",
    });
    return;
  }
};

export default validateNewUser;
