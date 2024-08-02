import { Request, Response } from "express";
import { BundleProduct } from "../models/admin.BundleProduct";
export const blockUnblockBundleProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const adminId = req.user.id;
    const productId = req.params.id;
    const { action } = req.body;
    const blockUnblockBundleProduct = await BundleProduct.findById(productId);
    if (blockUnblockBundleProduct?.isBlocked == true) {
      return res.status(400).json({
        status: "success",
        message: "This Bundle Product is already Blocked..",
      });
    }
    if (action == "Block") {
      if (blockUnblockBundleProduct) {
        blockUnblockBundleProduct.isBlocked = true;
        blockUnblockBundleProduct.isBlockedBy = adminId;
        blockUnblockBundleProduct.save();
        return res.status(200).json({
          status: "success",
          message: `Product is ${action}ed successfully..`,
        });
      }
    } else if (action == "Unblock") {
      if (blockUnblockBundleProduct) {
        blockUnblockBundleProduct.isBlocked = false;
        blockUnblockBundleProduct.isBlockedBy = undefined;
        blockUnblockBundleProduct.save();
        return res.status(200).json({
          status: "success",
          message: `Product is ${action}ed successfully..`,
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
