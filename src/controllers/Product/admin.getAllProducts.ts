import { Request, Response } from "express";
import { Product } from "../../models/admin.Product";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Extract page and limit from query parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch products with pagination and limit, excluding deleted products
    const products = await Product.find({
      isDeleted: false,
    })
      .skip(skip)
      .limit(limit);

    // Get the total count of products (excluding deleted ones)
    const totalProducts = await Product.countDocuments({ isDeleted: false });

    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
