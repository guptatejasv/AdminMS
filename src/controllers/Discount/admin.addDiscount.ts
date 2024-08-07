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
        const { discountCoupon, discount, startDate, endDate } = req.body;
        if (!discountCoupon || !discount || !startDate || !endDate) {
          return res
            .status(204)
            .json({ message: "All fields are required to fill" });
        }
        const discountCouponCheck = await Discount.findOne({
          discountCoupon,
        });
        if (discountCouponCheck) {
          return res.status(400).json({
            status: "success",
            message: "Please Enter a different Discount Coupon..",
          });
        }
        const discountDetail = await Discount.create({
          adminId: id,
          productId: pro_id,
          discountCoupon,
          discount,
          startDate,
          endDate,
        });
        const discountId = await Discount.find({
          adminId: id,
          productId: pro_id,
        });
        const products = await Product.findById(pro_id);
        if (!products?.DiscountPrice) {
          if (products) {
            const discountPrice =
              products.price - (products.price * discount) / 100;
            products.DiscountPrice = discountPrice;
            await products.save();
          }
        } else {
          const discountPrice =
            products.DiscountPrice - (products.DiscountPrice * discount) / 100;
          products.DiscountPrice = discountPrice;
          await products.save();
        }
        await Product.findByIdAndUpdate(pro_id, {
          adminDiscountId: discountId,
        });
        console.log(discountId);
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
