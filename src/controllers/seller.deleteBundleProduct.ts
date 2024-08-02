import { Request, Response } from "express";

import { BundleProduct } from "../models/admin.BundleProduct";

export const deleteBundleProduct = async (req: Request, res: Response) => {
  try {
    // const bundlePro_id = req.params.id;
    // const bundleProduct = await BundleProduct.findById(bundlePro_id);
    // if (bundleProduct) {
    //   bundleProduct.isDeleted = true;
    //   await bundleProduct.save();
    // }
    // res.status(200).json({
    //   status: "success",
    //   message: "Bundle Product deleted successfully..",
    // });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
