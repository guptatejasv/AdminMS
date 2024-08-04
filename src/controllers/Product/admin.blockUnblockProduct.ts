import { Request, Response } from "express";
import { Product } from "../../models/admin.Product";
export const blockUnblockProduct = async (req: Request, res: Response) => {
  try {
    const adminId = req.user.id;
    const productId = req.params.id;
    const { action } = req.body;
    const blockUnblockProduct = await Product.findById(productId);
    if (blockUnblockProduct?.isBlocked == true) {
      return res.status(400).json({
        status: "success",
        message: `This product is already blocked..`,
      });
    }
    if (action == "Block") {
      if (blockUnblockProduct) {
        blockUnblockProduct.isBlocked = true;
        blockUnblockProduct.isBlockedBy = adminId;
        blockUnblockProduct.save();
        return res.status(200).json({
          status: "success",
          message: `Product is ${action}ed successfully..`,
        });
      }
    } else if (action == "Unblock") {
      if (blockUnblockProduct) {
        blockUnblockProduct.isBlocked = false;
        blockUnblockProduct.isBlockedBy = undefined;
        blockUnblockProduct.save();
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
