import { Request, Response } from "express";

import { BundleProduct } from "../../models/admin.BundleProduct";

export const deleteBundleProduct = async (req: Request, res: Response) => {
  try {
    const pro_id = req.params.id;
    const bundleProduct = await BundleProduct.findById(pro_id);
    if (bundleProduct) {
      if (bundleProduct.sellerId) {
        res.status(400).json({
          status: "fail",
          message: "You cann't delete bundle product created by sellers..",
        });
      } else {
        bundleProduct.isDeleted = true;
        bundleProduct.save();
        res.status(200).json({
          status: "success",
          message: "Bundle Product is deleted successfully..",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
