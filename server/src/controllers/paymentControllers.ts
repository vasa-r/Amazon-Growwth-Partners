import { NextFunction, Request, Response } from "express";
import Payment from "../model/paymentModel";
import { CustomUserReq, statusCode } from "../types/types";

const addPayment = async (
  req: CustomUserReq,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user } = req;

  const { name, paymentType, cardNumber, cvv, upiId } = req.body;
  try {
    const createPayment = await Payment.create({
      user,
      name,
      paymentType,
      cardNumber,
      cvv,
      upiId,
    });

    if (!createPayment) {
      res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: "Payment method not added. Please try agin later",
      });
      return;
    }

    res.status(statusCode.CREATED).json({
      success: true,
      message: "Payment method added",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getPayments = async (
  req: CustomUserReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const payment = await Payment.find(
      {
        user: req.user,
      },
      { paymentType: 1, cardNumber: 1, upiId: 1 }
    );

    if (!payment) {
      res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: "No payment option avilable. Please add one",
      });
      return;
    }

    res.status(statusCode.CREATED).json({
      success: true,
      message: "Payment method fetched",
      data: payment,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { addPayment, getPayments };
