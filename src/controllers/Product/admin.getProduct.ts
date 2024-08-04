import { Request, Response } from "express";
import { Product } from "../../models/admin.Product";

export const getProduct = async (req: Request, res: Response) => {
  try {
    const pro_Id = req.params.id;
    const product = await Product.findById(pro_Id);
    if (!product) {
      return res.status(200).json({
        status: "success",
        message: "No product is exist with this Product Id",
      });
    }
    if (product.isDeleted == true) {
      return res.status(200).json({
        status: "success",
        message: "No product is exist with this Product Id",
      });
    }
    res.status(200).json({
      status: "success",
      result: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
