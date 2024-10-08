import { NextFunction, Response } from "express";
import Order from "../model/orderModel";
import { CustomUserReq, statusCode } from "../types/types";

const addOrder = async (
  req: CustomUserReq,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user } = req;
  const {
    address,
    products,
    totalPrice,
    paymentMode,
    deliveryDate,
    orderedDate,
  } = req.body;
  try {
    const createOrder = await Order.create({
      user,
      address,
      products,
      totalPrice,
      paymentMode,
      deliveryDate,
      orderedDate,
    });

    if (!createOrder) {
      res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: "Couldn't place order now. Please try again later",
      });
      return;
    }

    res.status(statusCode.CREATED).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getOrder = async (
  req: CustomUserReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find({
      user: req.user,
    });

    if (!orders) {
      res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: "No orders avilable. Please add one",
      });
      return;
    }

    res.status(statusCode.CREATED).json({
      success: true,
      message: "Orders fetched",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { addOrder, getOrder };
