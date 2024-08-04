import { Request, Response } from "express";
// import { Product } from "../models/seller.Product";
import { Discount } from "../../models/admin.Discount";
import { Product } from "../../models/admin.Product";
import { Admin } from "../../models/admin.Admin";

export const addDiscount = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;

    const admin = await Admin.findById(id);
    if (admin) {
      if (admin.role == "admin") {
        const pro_id = req.params.id;
        const { discountType, discount, startDate, endDate } = req.body;
        if (!discountType || !discount || !startDate || !endDate) {
          return res
            .status(204)
            .json({ message: "All fields are required to fill" });
        }
        const discountDetail = await Discount.create({
          adminId: id,
          productId: pro_id,
          discountType,
          discount,
          startDate,
          endDate,
        });
        const product = await Product.findById(pro_id);
        if (product) {
          if (
            product.DiscountAddedBy &&
            product.DiscountPrice &&
            product.DiscountCreatorId
          ) {
            if (product.DiscountAddedBy[0] == "Seller") {
              const discountedPrice =
                product.DiscountPrice -
                (product.DiscountPrice * discount) / 100;
              product.DiscountPrice = discountedPrice;
              (product.DiscountAddedBy[1] = "Admin"),
                (product.DiscountCreatorId[1] = id);
              await product.save();
            }
          }
          // const discountedPrice =
          //   product.price - (product.price * discount) / 100;
          // product.DiscountPrice = discountedPrice;
          // (product.DiscountAddedBy = ["Seller"]),
          //   (product.DiscountCreatorId = id);
          // product.save();
        }

        return res.status(201).json({
          status: "success",
          data: {
            discountDetail,
          },
        });
      }
    }
    return res.status(401).json({
      status: "fail",
      message: "You are unautherized to add products.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
