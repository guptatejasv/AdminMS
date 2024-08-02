import { Request, Response } from "express";
// import { Product } from "../models/seller.Product";
import { BundleProduct } from "../models/admin.BundleProduct";

export const getBundleProducts = async (req: Request, res: Response) => {
  try {
    const bundleProduct = await BundleProduct.find({
      isDeleted: false,
    });

    res.status(200).json({
      status: "success",
      result: bundleProduct.length,
      data: {
        bundleProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
