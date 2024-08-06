import { Request, Response } from "express";
import { Product } from "../../models/admin.Product";
import { Category } from "../../models/admin.Category";

import { Admin } from "../../models/admin.Admin";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const admin = await Admin.findById(user.id);

    if (admin) {
      if (admin.role == "admin") {
        const { name, description, price, category } = req.body;
        const product = await Product.create({
          adminId: user.id,
          name,
          description,
          price,
          category,
        });
        const catExit = await Category.findOne({ categoryName: category });
        if (!catExit) {
          return res.status(400).json({
            status: "fail",
            message: "The category you choose does not exist..",
          });
        }

        return res.status(201).json({
          status: "success",
          message: "Product Added Successfully..",
          data: {
            product,
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
