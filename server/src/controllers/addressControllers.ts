import { NextFunction, Request, Response } from "express";
import Address from "../model/addressModel";
import { AddAddressType, CustomUserReq, statusCode } from "../types/types";

const addAdress = async (
  req: CustomUserReq,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user } = req;

  const { addressTitle, buildNo, address, city, pincode, phone } = req.body;
  try {
    const createAddress = await Address.create({
      addressTitle,
      buildNo,
      address,
      city,
      pincode,
      phone,
      user,
    });

    if (!createAddress) {
      res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: "Address not added. Please try agin later",
      });
      return;
    }

    res.status(statusCode.CREATED).json({
      success: true,
      message: "Address added",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAddress = async (
  req: CustomUserReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const address = await Address.find({
      user: req.user,
    });

    if (!address) {
      res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: "No addres avilable. Please add one",
      });
      return;
    }

    res.status(statusCode.CREATED).json({
      success: true,
      message: "Address fetched",
      data: address,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { addAdress, getAddress };
