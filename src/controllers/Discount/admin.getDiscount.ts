import { Request, Response } from "express";
import { Discount } from "../../models/admin.Discount";
import { Admin } from "../../models/admin.Admin";

export const getDiscount = async (req: Request, res: Response) => {
  try {
    const pro_id = req.params.id;
    const user = req.user;
    const admin = await Admin.findById(user.id);
    if (admin) {
      if (admin.role != "admin") {
        return res.status(401).json({
          status: "fail",
          message: "You are unautherized to get Discount.",
        });
      }
    }
    const discount = await Discount.findOne({
      productId: pro_id,
      adminId: user.id,
    });
    if (discount) {
      if (discount.isDeleted == true || discount.isBlocked == true) {
        return res.status(400).json({
          status: "fail",
          message: `This Discount has been deleted or Blocked by admin..`,
        });
      }
    }
    res.status(200).json({
      status: "success",
      data: {
        discount,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
