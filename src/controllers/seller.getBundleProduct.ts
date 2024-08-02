import { Request, Response } from "express";
import { BundleProduct } from "../models/admin.BundleProduct";

export const getBundleProduct = async (req: Request, res: Response) => {
  try {
    const bundlePro_id = req.params.id;

    const bundleProduct = await BundleProduct.findById(bundlePro_id);

    if (bundleProduct) {
      if (bundleProduct.isDeleted == true) {
        return res.status(400).json({
          status: "fail",
          message: `This Bundle product has been deleted..`,
        });
      }
    }
    res.status(200).json({
      status: "success",
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
