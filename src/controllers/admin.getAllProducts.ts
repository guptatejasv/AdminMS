import { Request, Response } from "express";
import { Product } from "../models/admin.Product";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({
      isDeleted: false,
    });
    if (products) {
      res.status(200).json({
        status: "success",
        results: products.length,
        data: {
          products,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
