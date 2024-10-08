import { NextFunction, Request, Response } from "express";
import Product from "../model/productModel";
import { statusCode } from "../types/types";

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();
    if (products.length < 1) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "No products available",
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      message: "Data fetched Successfully",
      data: products,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "No product available",
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      message: "Data fetched Successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { getAllProducts, getProduct };
