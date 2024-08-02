/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { Category } from "../models/admin.Category";

export const addCategory = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const { cateName } = req.body;
    const categoryPrev = await Category.findOne({ categoryName: cateName });
    if (categoryPrev) {
      if (categoryPrev.isDeleted == true) {
        categoryPrev.isDeleted = false;
        await categoryPrev.save();
        return res.status(200).json({
          status: "success",
          message: "Category added Successfully..",
          result: {
            categoryPrev,
          },
        });
      } else if (categoryPrev.isDeleted == false) {
        return res.status(400).json({
          status: "fail",
          message: `${cateName} category is already listed..`,
        });
      }
    }

    const category = await Category.create({
      categoryName: cateName,
      createdBy: id,
    });

    res.status(200).json({
      status: "success",
      message: "Category added Successfully..",
      result: {
        category,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const cateId = req.params.id;
    const category = await Category.findById(cateId);
    if (!category) {
      return res.status(400).json({
        status: "fail",
        message: "There is no category with this id",
      });
    }
    if (category.isDeleted) {
      return res.status(400).json({
        status: "fail",
        message: "This Category has been deleted..",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const allCategory = await Category.find({
      isDeleted: false,
    });

    res.status(200).json({
      status: "success",
      results: allCategory.length,
      data: {
        allCategory,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const cateId = req.params.id;

    const categoryPrev = await Category.findById(cateId);
    if (categoryPrev) {
      if (categoryPrev.isDeleted) {
        return res.status(400).json({
          status: "fail",
          message: `${categoryPrev.categoryName} category has been deleted..`,
        });
      }
    }
    const category = await Category.findByIdAndUpdate(cateId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(400).json({
        status: "fail",
        message: "There is no category with this id",
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "Category details updated successfully..",
        data: {
          category,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const cateId = req.params.id;
    const deleteCat = await Category.findById(cateId);
    if (!deleteCat) {
      return res.status(400).json({
        status: "fail",
        message: "There is no category with this id",
      });
    }
    deleteCat.isDeleted = true;
    await deleteCat.save();
    res.status(200).json({
      status: "success",
      message: `${deleteCat.categoryName} Category is deleted successfully..`,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
