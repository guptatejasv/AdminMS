import { Request, Response } from "express";
import { Discount } from "../../models/admin.Discount";
import { Admin } from "../../models/admin.Admin";
import { BundleProduct } from "../../models/admin.BundleProduct";

export const deleteDiscountOnBundle = async (req: Request, res: Response) => {
  try {
    const dis_id = req.params.id;
    const user = req.user;
    const admin = await Admin.findById(user.id);
    if (admin) {
      const discount = await Discount.findById(dis_id);
      const bundleProducts = await BundleProduct.findOne({
        _id: discount?.productId,
      });
      if (discount?.adminId) {
        return res.status(200).json({
          status: "fail",
          message: "You cann't delete the discount added by admin..",
        });
      }

      if (discount) {
        if (discount.isDeleted == true) {
          return res.status(400).json({
            status: "fail",
            message: "Discount with this id is alreay remove from product.",
          });
        }
        discount.isDeleted = true;
        await discount.save();
      }

      if (bundleProducts) {
        if (!bundleProducts?.DiscountPrice) {
          const revivedPrice =
            (bundleProducts?.bundlePrice || 0) +
            ((discount?.previousPrice || 0) * (discount?.discount || 0)) / 100;
          bundleProducts.DiscountPrice = revivedPrice;

          await bundleProducts.save();
        } else {
          const revivedPrice =
            (bundleProducts?.DiscountPrice || 0) +
            ((discount?.previousPrice || 0) * (discount?.discount || 0)) / 100;
          bundleProducts.DiscountPrice = revivedPrice;
          if (bundleProducts.DiscountPrice == bundleProducts.bundlePrice) {
            bundleProducts.DiscountPrice = undefined;
            await bundleProducts.save();
          }
          await bundleProducts.save();
        }
        const updatedDiscountIds = (
          bundleProducts.adminDiscountId || []
        ).filter((id) => id.toString() !== dis_id.toString());

        bundleProducts.adminDiscountId = updatedDiscountIds;
        await bundleProducts.save();
      }
      console.log(discount);
      return res.status(200).json({
        status: "success",
        message: "Discount is Deleted on this product..",
      });
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
